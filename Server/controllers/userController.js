// server/controllers/userController.js

const userService = require('../services/userService');

// Register a new user
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const newUser = await userService.registerUser(username, password, email);
    res.status(201).json(newUser);  // Return the created user
  } catch (error) {
    res.status(400).json({ message: 'User registration failed: 1 ' + error.message });
  }
};

// Get all users (limit to 10)
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users: ' + error.message });
  }
};

// Delete all users (for testing purposes)
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser();
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users: ' + error.message });
  }
};

module.exports = { registerUser, getUsers, deleteUser };
