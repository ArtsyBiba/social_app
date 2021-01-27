const router = require('express').Router();
const User = require('../models/userModel');

router.get('/usersList', async (req, res) => {
    const user = await User.find({});
    res.json({
        user: user,
    });
});

router.post('/follow', async (req, res) => {
    const { userToFollow, currentUser } = req.body;
    
    const updatedUserOne = await User.findOne({ _id: currentUser.id });
    updatedUserOne.followings.push(userToFollow);
    const savedUserOne = await updatedUserOne.save();

    const updatedUserTwo = await User.findOne({ _id: userToFollow._id });
    updatedUserTwo.followers.push(currentUser);
    const savedUserTwo = await updatedUserTwo.save();

    res.json(savedUserOne);
});

module.exports = router;