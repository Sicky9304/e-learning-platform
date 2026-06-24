const express = require('express');

const { getChatRecommendation } = require('../controllers/chatboat.controller');

const router = express.Router();

router.post('/ask', getChatRecommendation);

module.exports = router;
