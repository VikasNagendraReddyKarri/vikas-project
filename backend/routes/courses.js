const express = require('express');
const { getCourses, createCourse } = require('../controllers/courseController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', getCourses);
router.post('/', authenticateToken, createCourse);

module.exports = router;