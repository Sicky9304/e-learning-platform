// @ts-nocheck
const Course = require('../models/course.model');
require('../models/curriculum.model');
require('../models/section.model');
require('../models/lesson.model');
require('../models/progress.model');
const ErrorHandler = require('../middlewares/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const mongoose = require('mongoose');

// console.log('Registered Models =>');
// console.log(mongoose.modelNames());

// GET ALL COURSES
exports.getCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find().populate('mentor');

  res.status(200).json(courses);
});

// GET SINGLE COURSE
exports.getCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id)
    .populate('mentor')
    .populate({
      path: 'curriculum',
      populate: {
        path: 'sections',
        populate: {
          path: 'lessons',
        },
      },
    });

  if (!course) {
    return next(new ErrorHandler('Course not found', 404));
  }

  const formattedCourse = {
    ...course.toObject(),

    curriculum:
      course.curriculum?.sections?.map((section) => ({
        _id: section._id,
        title: section.title,
        lessons: section.lessons,
      })) || [],
  };

  res.status(200).json(formattedCourse);
});

// CREATE COURSE
exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    course,
  });
});

// UPDATE COURSE
exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new ErrorHandler('Course not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    course,
  });
});

// DELETE COURSE
exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new ErrorHandler('Course not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
  });
});

// GET CATEGORY COUNT
exports.getCategoryCount = catchAsyncErrors(async (req, res, next) => {
  const categories = await Course.aggregate([
    {
      $group: {
        _id: '$category',
        totalCourses: { $sum: 1 },
      },
    },
    {
      $sort: {
        totalCourses: -1,
      },
    },
  ]);

  res.status(200).json(categories);
});

// GET LATEST COURSES
exports.getLatestCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await Course.find().populate('mentor').sort({ createdAt: -1 }).limit(5);

  res.status(200).json(courses);
});
