// server/services/userService.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Function to validate email format
const validateEmail = (email) => {
  // Regex to check if email ends with .companyinitial before the @ symbol
  const emailRegex = /^[a-zA-Z0-9._%+-]+\.c/;
  return emailRegex.test(email);
};

// Register a new user
const registerUser = async (username, password, email) => {
  try {
    // Validate email format
    if (!validateEmail(email)) {
      throw new Error('Email must end with ".companyinitial" before the "@" symbol');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const newUser = await new Promise((resolve, reject) => {
      User.createUser(username, hashedPassword, email, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    return newUser;
  } catch (error) {
    throw new Error('Error registering user: 0 ' + error.message);
  }
};

// Get up to 10 users
const getUsers = async () => {
  try {
    const users = await new Promise((resolve, reject) => {
      User.getUsers((err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });

    // Limit to 10 users
    return users.slice(0, 10);
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

// Delete all users
const deleteUser = async () => {
  try {
    await new Promise((resolve, reject) => {
      User.deleteUser((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw new Error('Error deleting users: ' + error.message);
  }
};

module.exports = {
  registerUser,
  getUsers,
  deleteUser
};
