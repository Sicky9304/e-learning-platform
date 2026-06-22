const express = require('express');
const router = express.Router();

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCategoryCount,
  getLatestCourses,
} = require('../controllers/course.controller');

const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');

const { authorizeRoles } = require('../middlewares/authorizeRoles');

// PUBLIC ROUTES

// GET Category Count
router.get('/category-count', getCategoryCount);

// GET Top 5 Latest Courses
router.get('/latest', getLatestCourses);

// GET All Courses
router.get('/', getCourses);

// GET Single Course
router.get('/:id', getCourse);

// ADMIN ONLY ROUTES

// CREATE Course
router.post('/', isAuthenticatedUser, authorizeRoles('admin'), createCourse);

// UPDATE Course
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateCourse);

// DELETE Course
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteCourse);

module.exports = router;
