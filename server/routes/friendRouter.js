const router = require('express').Router();
const User = require('../models/userModel');

router.get('/usersList', async (req, res) => {
    const user = await User.find({});
    res.json({
        user: user,
    });
});

router.put('/follow', async (req, res) => {
    const { userToFollow, currentUser } = req.body;
    
    const updatedUserOne = await User.findOne({ _id: currentUser.id });
    updatedUserOne.followings.push(userToFollow);
    const savedUserOne = await updatedUserOne.save();

    const updatedUserTwo = await User.findOne({ _id: userToFollow._id });
    updatedUserTwo.followers.push(currentUser);
    const savedUserTwo = await updatedUserTwo.save();

    res.json(savedUserOne);
});

router.put('/unfollow', async (req, res) => {
    const { userToUnfollow, currentUser } = req.body;

    const updatedUserOne = await User.updateOne(
        { '_id': currentUser.id }, 
        { $pull: { 'followings' : userToFollow._id } }
    );
    const savedUserOne = await updatedUserOne.save();

    const updatedUserTwo = await User.updateOne(
        { '_id': userToFollow._id }, 
        { $pull: { 'followers' : currentUser.id } }
    );
    const savedUserTwo = await updatedUserTwo.save();
    
    res.json(savedUserOne);
});

module.exports = router;