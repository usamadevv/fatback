const express = require('express');
const { 
    registerUser, 
    loginUser, 
    resetPassword, 
    verifyResetToken 
} = require('./user.controller'); // Import modified controller
const { verifyUserToken, verifyToken } = require('../utils/token'); // Middleware for authentication

const userRouter = express.Router();

// 🔹 User Registration
userRouter.post('/api/user/register', registerUser);

// 🔹 User Login
userRouter.post('/api/user/login', loginUser);

// 🔹 Password Reset Request (Sends Email)
userRouter.post('/api/user/reset-password', resetPassword);
userRouter.post('/api/user/verify', verifyToken);


// 🔹 Verify Reset Token & Change Password
userRouter.post('/api/user/verify-reset', verifyResetToken);

module.exports = userRouter;
