const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: 'localhost',
  database: 'feedback_system',
  password: '',
  port: 5432,
});

module.exports = pool;