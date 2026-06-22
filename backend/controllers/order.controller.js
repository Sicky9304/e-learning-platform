//@ts-nocheck
const Order = require('../models/order.model');
const Course = require('../models/course.model');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    customerName,
    email,
    phone,
    items,
    paymentMode,
    paymentStatus,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  } = req.body;

  // Check if items exist
  if (!items || items.length === 0) {
    return next(new ErrorHandler('Order items are required', 400));
  }

  let validatedItems = [];
  let calculatedTotal = 0;

  // Validate all courses
  for (const item of items) {
    const course = await Course.findById(item.course);

    if (!course) {
      return next(new ErrorHandler(`Course not found: ${item.course}`, 404));
    }

    // Prevent duplicate purchase
    const existingOrder = await Order.findOne({
      user: req.user._id,
      'items.course': course._id,
      status: { $ne: 'Cancelled' },
    });

    if (existingOrder) {
      return next(new ErrorHandler(`${course.title} already purchased`, 400));
    }

    validatedItems.push({
      course: course._id,
      title: course.title,
      price: course.price,
    });

    calculatedTotal += course.price;
  }

  const order = await Order.create({
    user: req.user._id,
    customerName,
    email,
    phone,

    // Save validated course data
    items: validatedItems,

    // Calculate total from DB
    totalAmount: calculatedTotal,

    paymentMode,
    paymentStatus,

    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

/*
|--------------------------------------------------------------------------
| Get Logged In User Orders
|--------------------------------------------------------------------------
*/
exports.getMyOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  })
    .populate('items.course')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});

/*
|--------------------------------------------------------------------------
| Get Single Order
|--------------------------------------------------------------------------
*/
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('items.course');

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  // User can view only his own order
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new ErrorHandler('Not authorized to access this order', 403));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

/*
|--------------------------------------------------------------------------
| Admin - Get All Orders
|--------------------------------------------------------------------------
*/
exports.getAllOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    orders,
  });
});

/*
|--------------------------------------------------------------------------
| Admin - Update Order Status
|--------------------------------------------------------------------------
*/
const User = require('../models/user.model');
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  const user = await User.findById(order.user);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  /*
  |--------------------------------------------------------------------------
  | Payment Approved
  |--------------------------------------------------------------------------
  */
  if (req.body.paymentStatus === 'Paid' && order.paymentStatus !== 'Paid') {
    for (const item of order.items) {
      const alreadyEnrolled = user.enrolledCourses.some(
        (courseId) => courseId.toString() === item.course.toString()
      );

      if (!alreadyEnrolled) {
        user.enrolledCourses.push(item.course);
      }
    }

    await user.save();
  }

  /*
  |--------------------------------------------------------------------------
  | Payment Failed / Cancelled
  |--------------------------------------------------------------------------
  */
  if (req.body.paymentStatus === 'Failed' && order.paymentStatus === 'Paid') {
    for (const item of order.items) {
      user.enrolledCourses = user.enrolledCourses.filter(
        (courseId) => courseId.toString() !== item.course.toString()
      );
    }

    await user.save();
  }

  /*
  |--------------------------------------------------------------------------
  | Update Order Status
  |--------------------------------------------------------------------------
  */
  if (req.body.status) {
    order.status = req.body.status;
  }

  if (req.body.paymentStatus) {
    order.paymentStatus = req.body.paymentStatus;
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    order,
  });
});

/*
    |--------------------------------------------------------------------------
    | Admin - Delete Order
    |--------------------------------------------------------------------------
    */
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully',
  });
});
