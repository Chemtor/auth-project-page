const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/userControllers');
const { authenticate } = require('../middleware/userMiddleware');

router.get('/me', authenticate, getUserInfo);

module.exports = router;