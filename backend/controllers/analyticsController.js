const pool = require('../db');

const getAnalytics = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    // Example: Average rating per course
    const result = await pool.query(`
      SELECT c.title, AVG(f.rating) as avg_rating, COUNT(f.id) as feedback_count
      FROM courses c
      LEFT JOIN feedback f ON c.id = f.course_id
      GROUP BY c.id, c.title
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAnalytics };