const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email || !password || !passwordCheck) {
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ msg: 'The password has to be at least 6 characters long.' });
        }
        if (password !== passwordCheck) {
            return res
                .status(400)
                .json({ msg: 'Passowrds do not match.' });
        }
        if (!regexp.test(email)) {
            return res
                .status(400)
                .json({ msg: 'The email is not valid.' });
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

        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        }

        const user = await User.findOne({ email }).populate('polls').populate('followers').populate('followings');
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
                polls: user.polls,
                followers: user.followers,
                followings: user.followings,
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(500).json({ error: err.message });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(500).json({ error: err.message });
        }

        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({ message: 'Valid Token' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user).populate('polls').populate('followers').populate('followings');
    res.json({
        displayName: user.displayName,
        id: user._id,
        polls: user.polls,
        followers: user.followers,
        followings: user.followings,
    });
});

module.exports = router;