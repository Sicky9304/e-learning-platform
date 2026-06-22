const express = require('express');
const router = express.Router();

const {
  getMentors,
  getMentor,
  createMentor,
  updateMentor,
  deleteMentor,
} = require('../controllers/mentor.controller');

const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');

const { authorizeRoles } = require('../middlewares/authorizeRoles');

// ==============================
// PUBLIC ROUTES
// ==============================

// GET All Mentors
router.get('/', getMentors);

// GET Single Mentor By ID
router.get('/:id', getMentor);

// ==============================
// ADMIN ONLY ROUTES
// ==============================

// CREATE Mentor
router.post('/', isAuthenticatedUser, authorizeRoles('admin'), createMentor);

// UPDATE Mentor
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateMentor);

// DELETE Mentor
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteMentor);

module.exports = router;
