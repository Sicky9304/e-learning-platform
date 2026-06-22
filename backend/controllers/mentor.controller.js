// @ts-nocheck

const Mentor = require('../models/mentor.model');
const ErrorHandler = require('../middlewares/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// GET ALL MENTORS
exports.getMentors = catchAsyncErrors(async (req, res, next) => {
  const mentors = await Mentor.find();

  res.status(200).json({
    success: true,
    count: mentors.length,
    mentors,
  });
});

// GET SINGLE MENTOR
exports.getMentor = catchAsyncErrors(async (req, res, next) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    return next(new ErrorHandler('Mentor not found', 404));
  }

  res.status(200).json({
    success: true,
    mentor,
  });
});

// CREATE MENTOR
exports.createMentor = catchAsyncErrors(async (req, res, next) => {
  const mentor = await Mentor.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Mentor created successfully',
    mentor,
  });
});

// UPDATE MENTOR
exports.updateMentor = catchAsyncErrors(async (req, res, next) => {
  const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!mentor) {
    return next(new ErrorHandler('Mentor not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Mentor updated successfully',
    mentor,
  });
});

// DELETE MENTOR
exports.deleteMentor = catchAsyncErrors(async (req, res, next) => {
  const mentor = await Mentor.findByIdAndDelete(req.params.id);

  if (!mentor) {
    return next(new ErrorHandler('Mentor not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Mentor deleted successfully',
  });
});
