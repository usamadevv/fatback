const User = require('../models/user.model'); // Import User model
const sendEmail = require('../utils/sendEmail');
const { generateToken } = require('../utils/token'); // JWT Token function
const nodemailer = require('nodemailer'); // For sending emails

// 🔹 User Registration
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash Password

        // Generate Reset Token (Temporary)
        const resetToken = Math.random().toString(36).substr(2, 8);


        
        // Send Email
        await sendEmail('Reset Token',`Your otp is ${resetToken}`,email);
     
        // Create new user
        const newUser = new User({ username, email, password: password,status:'pending',resetToken });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🔹 User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email,status:'approved' });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare Passwords
        const isMatch = password===user.password;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate Token
        const token = generateToken({ userId: user._id, email: user.email });

        return res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🔹 Password Reset (via Email)
const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Reset Token (Temporary)
        const resetToken = Math.random().toString(36).substr(2, 8);

        // Store Reset Token (Optional: You can save it in DB)
        user.resetToken = resetToken;
        await user.save();

        
        // Send Email
        await sendEmail('Reset Token',`Your otp is ${resetToken}`);

        return res.status(200).json({ message: 'Reset code sent to your email' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending reset email' });
    }
};

// 🔹 Verify Reset Token and Change Password
const verifyResetToken = async (req, res) => {
    try {
        const { email, resetToken, password } = req.body;

        // Find User
        const user = await User.findOne({ email, resetToken });
        if (!user) {
            return res.status(400).json({ message: 'Invalid reset token' });
        }

        
        // Update Password
        user.password = password;
        user.resetToken = null; // Clear Reset Token
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error resetting password' });
    }
};

// Export Controllers
module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    verifyResetToken
};
