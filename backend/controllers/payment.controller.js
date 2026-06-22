//@ts-nocheck
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user.model');
const Course = require('../models/course.model');
const Order = require('../models/order.model');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/*
|--------------------------------------------------------------------------
| Create Razorpay Order
|--------------------------------------------------------------------------
*/
exports.createRazorpayOrder = catchAsyncErrors(async (req, res, next) => {
  const { items } = req.body;

  // Check items
  if (!items || items.length === 0) {
    return next(new ErrorHandler('Order items are required', 400));
  }

  // Find Logged In User
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  let totalAmount = 0;

  // Validate Courses & Calculate Amount
  for (const item of items) {
    const course = await Course.findById(item.course);

    if (!course) {
      return next(new ErrorHandler(`Course not found: ${item.course}`, 404));
    }
    // Prevent Duplicate purchase
    const existingOrder = await Order.findOne({
      user: req.user._id,
      'items.course': course._id,
      status: { $ne: 'Cancelled' },
    });

    if (existingOrder) {
      return next(new ErrorHandler(`${course.title} already purchased`, 400));
    }

    // Prevent Duplicate Enrollment
    const alreadyEnrolled =
      user.enrolledCourses &&
      user.enrolledCourses.some((id) => id.toString() === course._id.toString());

    if (alreadyEnrolled) {
      return next(new ErrorHandler(`${course.title} already enrolled`, 400));
    }

    totalAmount += course.price;
  }

  // Razorpay Order Options
  const options = {
    amount: totalAmount * 100, // Amount in Paisa
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  // Create Razorpay Order
  const razorpayOrder = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
    amount: totalAmount,
    razorpayOrder,
  });
});

/*
|--------------------------------------------------------------------------
| Verify Razorpay Payment
|--------------------------------------------------------------------------
*/
exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {
  const {
    customerName,
    email,
    phone,
    items,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  // Verify Razorpay Signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return next(new ErrorHandler('Payment verification failed', 400));
  }

  // Find Logged In User
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  let validatedItems = [];
  let totalAmount = 0;

  // Validate Courses
  for (const item of items) {
    const course = await Course.findById(item.course);

    if (!course) {
      return next(new ErrorHandler(`Course not found: ${item.course}`, 404));
    }

    // Prevent Duplicate Purchase
    const existingOrder = await Order.findOne({
      user: req.user._id,
      'items.course': course._id,
      status: { $ne: 'Cancelled' },
    });

    if (existingOrder) {
      return next(new ErrorHandler(`${course.title} already purchased`, 400));
    }

    // Prevent Duplicate Enrollment
    const alreadyEnrolled =
      user.enrolledCourses &&
      user.enrolledCourses.some((id) => id.toString() === course._id.toString());

    if (alreadyEnrolled) {
      return next(new ErrorHandler(`${course.title} already enrolled`, 400));
    }

    validatedItems.push({
      course: course._id,
      title: course.title,
      price: course.price,
    });

    totalAmount += course.price;

    // Increase Student Count
    course.students += 1;
    await course.save();

    // Add To User Enrollments
    user.enrolledCourses.push(course._id);
  }

  // Save User Enrollments
  await user.save();

  // Create Order
  const order = await Order.create({
    user: req.user._id,

    customerName,
    email,
    phone,

    items: validatedItems,

    totalAmount,

    paymentMode: 'RAZORPAY',

    paymentStatus: 'Paid',

    status: 'Confirmed',

    razorpayOrderId: razorpay_order_id,

    razorpayPaymentId: razorpay_payment_id,

    razorpaySignature: razorpay_signature,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
