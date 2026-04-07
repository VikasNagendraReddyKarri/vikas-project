const pool = require('../db');

const submitFeedback = async (req, res) => {
  const { course_id, question_id, rating, comment } = req.body;
  const student_id = req.user.id;
  try {
    await pool.query(
      'INSERT INTO feedback (student_id, course_id, question_id, rating, comment) VALUES ($1, $2, $3, $4, $5)',
      [student_id, course_id, question_id, rating, comment]
    );
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeedback = async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query(
      'SELECT f.*, u.name FROM feedback f JOIN users u ON f.student_id = u.id WHERE f.course_id = $1',
      [courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitFeedback, getFeedback };