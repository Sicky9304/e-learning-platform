const express = require('express');

const router = express.Router();

const { markLessonComplete, getCourseProgress } = require('../controllers/progress.controller');

const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');

router.post('/:courseId/lesson/:lessonId', isAuthenticatedUser, markLessonComplete);

router.get('/:courseId', isAuthenticatedUser, getCourseProgress);

module.exports = router;
