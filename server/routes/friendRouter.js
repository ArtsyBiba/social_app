const router = require('express').Router();
const User = require('../models/userModel');

router.get('/usersList', async (req, res) => {
    const user = await User.find({});
    res.json({
        user: user,
    });
});

module.exports = router;