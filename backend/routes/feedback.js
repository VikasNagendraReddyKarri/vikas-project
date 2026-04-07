const express = require('express');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, submitFeedback);
router.get('/:courseId', authenticateToken, getFeedback);

module.exports = router;