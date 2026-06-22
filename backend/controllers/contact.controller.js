// @ts-nocheck

const Contact = require('../models/contact.model');
const ErrorHandler = require('../middlewares/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Email = require('../utils/email');

exports.getContactData = catchAsyncErrors(async (req, res, next) => {
  // console.log('BODY:', req.body);
  const { firstName, lastName, email, phone, subject, message } = req.body;

  // ==========================
  // SAVE TO DATABASE
  // ==========================

  const contact = await Contact.create({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });

  // ==========================
  // SEND EMAIL TO ADMIN
  // ==========================

  await Email.sendContactMessage({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Message submitted successfully! We will get back to you soon.',
    contact,
  });
});
