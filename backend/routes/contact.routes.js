const express = require("express");
const router = express.Router();

const { getContactData } = require('../controllers/contact.controller');
// PUBLIC ROUTE
// Submit Contact Form
router.post('/', getContactData);

module.exports = router;
