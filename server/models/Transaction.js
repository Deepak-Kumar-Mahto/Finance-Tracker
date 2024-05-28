const { pool } = require('../db'); // Assuming you have a db.js file for PostgreSQL connection

// Define a function to create a new transaction
const createTransaction = async (transactionData) => {
  try {
    const { text, amount } = transactionData;
    const queryText = 'INSERT INTO transactions (text, amount) VALUES ($1, $2) RETURNING *';
    const values = [text, amount];
    const result = await pool.query(queryText, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Define a function to delete a transaction
const deleteTransaction = async (transactionId) => {
  try {
    const queryText = 'DELETE FROM transactions WHERE id = $1 RETURNING *';
    const values = [transactionId];
    const result = await pool.query(queryText, values);
    
    // Check if any rows were affected by the delete operation
    if (result.rowCount === 0) {
      throw new Error('Transaction not found');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Export functions for interacting with transactions
module.exports = {
  createTransaction,
  deleteTransaction,
  // Export other functions here as needed
};