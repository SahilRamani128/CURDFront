const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../routes/user');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key'; // replace with a strong secret key

router.post('/signup', async (req, res) => {
    const { name, email, password, mobile } = req.body;
    try {
        const user = new User({ name, email, password, mobile });
        await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
