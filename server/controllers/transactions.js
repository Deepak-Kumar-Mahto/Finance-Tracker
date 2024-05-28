const { pool } = require('../db');
const createTransaction = require('../models/Transaction');
// @desc Get all transactions
//@route GET /api/v1/transactions
//@access Public

exports.getTransactions = async (req, res, next) => {
    try {
        const queryText = 'SELECT * FROM transactions'; // Adjust the query as per your database schema
        const result = await pool.query(queryText);
        const transactions = result.rows;

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        console.error('Error fetching transactions:', err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add transactions
//@route POST /api/v1/transactions
//@access Public

exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        
        if (!text || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Please provide both text and amount'
            });
        }

        const queryText = 'INSERT INTO transactions (text, amount) VALUES ($1, $2) RETURNING *';
        const values = [text, amount];
        const result = await pool.query(queryText, values);

        return res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Error adding transaction:', err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc Delete transactions
//@route DELETE /api/v1/transactions/:id
//@access Public

exports.deleteTransaction = async (req, res, next) => {
    try {
        const queryText = 'DELETE FROM transactions WHERE id = $1 RETURNING *';
        const values = [req.params.id];
        const result = await pool.query(queryText, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.error('Error deleting transaction:', err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};