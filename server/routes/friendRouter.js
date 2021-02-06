const router = require('express').Router();
const User = require('../models/userModel');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const filteredUsers = await User.find({ '_id': { '$ne': req.user } });
        res.json({
            filteredUsers: filteredUsers,
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.put('/follow', auth, async (req, res) => {
    try {
        const { userToFollow } = req.body;
        
        const updatedCurrentUser = await User.findById(req.user);
        updatedCurrentUser.followings.push(userToFollow);
        const savedUserOne = await updatedCurrentUser.save();

        const updatedUserToFollow = await User.findOne({ _id: userToFollow._id });
        updatedUserToFollow.followers.push(req.user);
        const savedUserTwo = await updatedUserToFollow.save();

        res.json(savedUserOne);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.put('/unfollow', auth, async (req, res) => {
    try {
        const { userToUnfollow } = req.body;

        const updatedCurrentUser = await User.updateOne(
            { '_id': req.user }, 
            { $pull: { 'followings' : userToUnfollow._id } }
        );

        const updatedUserToFollow = await User.updateOne(
            { '_id': userToUnfollow._id }, 
            { $pull: { 'followers' : req.user } }
        );
        
        res.json(updatedCurrentUser);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;