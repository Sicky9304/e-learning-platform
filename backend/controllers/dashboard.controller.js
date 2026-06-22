//@ts-nocheck
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Course = require('../models/course.model');
const Mentor = require('../models/mentor.model');

exports.getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  const totalCourses = await Course.countDocuments();

  const totalMentors = await Mentor.countDocuments();

  const totalCategories = (await Course.distinct('category')).length;

  const latestCourse = await Course.findOne().sort({ createdAt: -1 });

  const recentCourses = await Course.find().populate('mentor').sort({ createdAt: -1 }).limit(5);

  const recentMentors = await Mentor.find().sort({ createdAt: -1 }).limit(5);

  res.status(200).json({
    success: true,
    totalCourses,
    totalMentors,
    totalCategories,
    latestCourse,
    recentCourses,
    recentMentors,
  });
});
