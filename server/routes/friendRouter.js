const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');
const Poll = require('../models/pollModel');
const User = require('../models/userModel');

router.get('/usersList', async (req, res) => {
    const user = await User.find({});
    console.log(user)
    res.json({
        user: user,
    });
});

module.exports = router;