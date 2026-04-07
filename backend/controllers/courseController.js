const pool = require('../db');

const getCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCourse = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { title, instructor } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (title, instructor) VALUES ($1, $2) RETURNING id',
      [title, instructor]
    );
    res.status(201).json({ message: 'Course created', courseId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCourses, createCourse };