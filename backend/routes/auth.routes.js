const express = require('express');

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getMyCourses,
  getProfile,
  updateProfile,
  updatePassword,
  forgotPassword,
} = require('../controllers/auth.controller');

const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');
const upload = require('../middlewares/multer');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/me', isAuthenticatedUser, getUserProfile);

router.get('/my-courses', isAuthenticatedUser, getMyCourses);

router.get('/profile', isAuthenticatedUser, getProfile);

router.put('/profile/update', isAuthenticatedUser, upload.single('avatar'), updateProfile);

router.put('/update-password', isAuthenticatedUser, updatePassword);

router.post('/forgot-password', forgotPassword);

module.exports = router;
