//@ts-nocheck
const express = require('express');

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/order.controller');

const { isAuthenticatedUser } = require('../middlewares/isAuthenticatedUser');
const { authorizeRoles } = require('../middlewares/authorizeRoles');

const router = express.Router();

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

// Create Order
router.post('/create', isAuthenticatedUser, createOrder);

// Logged In User Orders
router.get('/my-orders', isAuthenticatedUser, getMyOrders);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Get All Orders
router.get('/admin/all', isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

// Update Order Status
router.put('/admin/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus);

// Delete Order
router.delete('/admin/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

/*
|--------------------------------------------------------------------------
| Single Order (Always Keep Last)
|--------------------------------------------------------------------------
*/

router.get('/:id', isAuthenticatedUser, getOrderById);

module.exports = router;
