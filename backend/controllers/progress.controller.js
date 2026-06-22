//@ts-nocheck
const Progress = require('../models/progress.model');
const Curriculum = require('../models/curriculum.model');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// =====================================================
// MARK LESSON AS COMPLETE
// =====================================================

exports.markLessonComplete = catchAsyncErrors(async (req, res, next) => {
  const { courseId, lessonId } = req.params;

  const userId = req.user._id;

  // ==========================================
  // FIND EXISTING PROGRESS
  // ==========================================

  let progress = await Progress.findOne({
    user: userId,
    course: courseId,
  });

  // ==========================================
  // CREATE PROGRESS IF NOT EXISTS
  // ==========================================

  if (!progress) {
    progress = await Progress.create({
      user: userId,
      course: courseId,
      completedLessons: [],
      percentage: 0,
    });
  }

  // ==========================================
  // PREVENT DUPLICATE LESSON COMPLETION
  // ==========================================

  const alreadyCompleted = progress.completedLessons.some((id) => id.toString() === lessonId);

  if (!alreadyCompleted) {
    progress.completedLessons.push(lessonId);
  }

  // ==========================================
  // GET CURRICULUM
  // ==========================================

  const curriculum = await Curriculum.findOne({
    course: courseId,
  }).populate({
    path: 'sections',
    populate: {
      path: 'lessons',
    },
  });

  if (!curriculum) {
    return next(new ErrorHandler('Curriculum not found for this course', 404));
  }

  // ==========================================
  // CALCULATE TOTAL LESSONS
  // ==========================================

  let totalLessons = 0;

  curriculum.sections.forEach((section) => {
    totalLessons += section.lessons.length;
  });

  // ==========================================
  // UPDATE PROGRESS %
  // ==========================================

  progress.percentage = Math.round((progress.completedLessons.length / totalLessons) * 100);

  progress.currentLesson = lessonId;

  await progress.save();

  // ==========================================
  // RESPONSE
  // ==========================================

  res.status(200).json({
    success: true,
    message: 'Lesson marked as completed',
    progress,
  });
});

// =====================================================
// GET COURSE PROGRESS
// =====================================================

exports.getCourseProgress = catchAsyncErrors(async (req, res, next) => {
  const { courseId } = req.params;

  const progress = await Progress.findOne({
    user: req.user._id,
    course: courseId,
  });

  if (!progress) {
    return res.status(200).json({
      success: true,
      progress: null,
    });
  }

  res.status(200).json({
    success: true,
    progress,
  });
});
