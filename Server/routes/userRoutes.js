// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for user API
router.post('/register', userController.registerUser);
router.get('/', userController.getUsers);
router.delete('/', userController.deleteUser);



module.exports = router;
