const router = require('express').Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        const { email, password, passwordCheck, displayName } = req.body;

        // validation
        if (!email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: 'The password has to be at least 5 characters long.' });
        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: 'Passowrds do not match.' });

        const existingUser = await User.find({ email: email })
        if (existingUser) 
            return res
                .status(400)
                .json({ msg: 'An account with this email already exists.' })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;