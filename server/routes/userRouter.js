const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;

        // validation
        if (!email || !password || !passwordCheck) {
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        }
        if (password.length < 5) {
            return res
                .status(400)
                .json({ msg: 'The password has to be at least 5 characters long.' });
        }
        if (password !== passwordCheck) {
            return res
                .status(400)
                .json({ msg: 'Passowrds do not match.' });
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: 'An account with this email already exists.' });
        }

        if (!displayName) {
            displayName = email;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            password: passwordHash,
            displayName,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'Account with this email does not exist.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ msg: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email,
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;