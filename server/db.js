const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root1234",
  host: "localhost",
  port: 5432,
  database: "finance_jwt",
});

const query = async (text, params) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;
  }
};

// Export the pool and query function so other modules can use them
module.exports = {
  pool,
  query,
};