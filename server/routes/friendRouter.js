const router = require('express').Router();
const User = require('../models/userModel');

router.get('/usersList', async (req, res) => {
    const user = await User.find({});
    res.json({
        user: user,
    });
});

router.put('/follow', async (req, res) => {
    try {
        const { userToFollow, currentUser } = req.body;
        
        const updatedCurrentUser = await User.findOne({ _id: currentUser.id });
        updatedCurrentUser.followings.push(userToFollow);
        const savedUserOne = await updatedCurrentUser.save();

        const updatedUserToFollow = await User.findOne({ _id: userToFollow._id });
        updatedUserToFollow.followers.push(currentUser.id);
        const savedUserTwo = await updatedUserToFollow.save();

        res.json(savedUserOne);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.put('/unfollow', async (req, res) => {
    try {
        const { userToUnfollow, currentUser } = req.body;

        const updatedCurrentUser = await User.updateOne(
            { '_id': currentUser.id }, 
            { $pull: { 'followings' : userToUnfollow._id } }
        );

        const updatedUserToFollow = await User.updateOne(
            { '_id': userToUnfollow._id }, 
            { $pull: { 'followers' : currentUser.id } }
        );
        
        res.json(updatedCurrentUser);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;