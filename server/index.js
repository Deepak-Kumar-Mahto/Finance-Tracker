const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');
const authorize = require("./middleware/authorization");
const bodyParser = require('body-parser');

const transactions = require('./routes/transactions');

// middleware

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Update this to match your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to send cookies with requests
}));
app.use(bodyParser.json());

// routes 
app.use("/auth", require("./routes/auth"));

app.use("/dashboard", require("./routes/dashboard"));

app.post('/auth/verify', authorize, (req, res) => {
  try {
    res.json(true); // Respond with true if the token is valid
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

app.use('/api/v1/transactions', transactions);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));