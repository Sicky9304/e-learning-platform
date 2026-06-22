const express = require('express');
const router = express.Router();

const { getDashboardStats } = require('../controllers/dashboard.controller');

const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');

const { authorizeRoles } = require('../middlewares/authorizeRoles');

// ==============================
// ADMIN ONLY ROUTES
// ==============================

// GET Dashboard Statistics
router.get('/stats', isAuthenticatedUser, authorizeRoles('admin'), getDashboardStats);

module.exports = router;
