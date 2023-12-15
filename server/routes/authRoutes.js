const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//Error Handler middleware 
const errorHandler = (res, error) => {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Check if required fields are present
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        //hash password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // creating new user
        const newUser = new User({ name, email, mobile, password: encryptedPassword });
        await newUser.save();

        // Success response
        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        errorHandler(res, error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Check if the password matches
        let passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token as a response
        return res.status(200).json({
            status: 'SUCCESS',
            message: "You've logged in successfully", token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
