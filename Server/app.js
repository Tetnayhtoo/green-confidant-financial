// server/app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
//const { createUserTable } = require('./models/userModel');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;
