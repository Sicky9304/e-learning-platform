//@ts-nocheck
const express = require('express');
const { createRazorpayOrder, verifyPayment } = require('../controllers/payment.controller');
const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
/*
|--------------------------------------------------------------------------
| Razorpay Routes
|--------------------------------------------------------------------------
*/

// Create Razorpay Order
router.post('/create-order', isAuthenticatedUser, createRazorpayOrder);

// Verify Payment
router.post('/verify-payment', isAuthenticatedUser, verifyPayment);

module.exports = router;
