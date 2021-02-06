const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');
const Poll = require('../models/pollModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const FriendsList = require('../models/friendsListModel');

router.post('/', auth, async (req, res) => {
    try {
        const { imageOne, imageTwo, question, friendlist, author } = req.body.newPollForUpload;
        const userId = req.user;

        if (!question || !friendlist) {
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        }
        if (!imageOne || !imageTwo) {
            return res
                .status(400)
                .json({ msg: 'Both images are required.' });
        }

        const uploadedResponseOne = await cloudinary.uploader.upload(imageOne, {
            upload_preset: 'social_app'
        });

        const uploadedResponseTwo = await cloudinary.uploader.upload(imageTwo, {
            upload_preset: 'social_app'
        });
        
        const imageOneUrl = uploadedResponseOne.secure_url;
        const imageOneVotes = 0;
        const imageTwoUrl = uploadedResponseTwo.secure_url;
        const imageTwoVotes = 0;
        const votedForImageOne = [];
        const votedForImageTwo = [];

        const newPoll = new Poll({
            question,
            friendlist,
            imageOneUrl,
            imageOneVotes,
            imageTwoUrl,
            imageTwoVotes,
            userId,
            author,
            votedForImageOne,
            votedForImageTwo,
        });
        const savedPoll = await newPoll.save();
        
        const updatedUser = await User.findById(req.user);
        updatedUser.polls.push(newPoll);
        await updatedUser.save();

        for (let friend of friendlist.friends) {
            const updatedFriend = await User.findById(friend._id);
            updatedFriend.pollsForReview.push(newPoll);
            await updatedFriend.save();
        };

        res.json(savedPoll);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const { pollId, friendListId } = req.body;
        const friendList = await FriendsList.findById(friendListId).populate('friendsLists');
        const deletedPoll = await Poll.findByIdAndDelete(pollId);

        await User.updateOne(
            { '_id': req.user }, 
            { $pull: { 'polls' : pollId } }
        );

        for (let friend of friendList.friends) {
            await User.updateOne(
                { '_id': friend._id }, 
                { $pull: { 'pollsForReview' : pollId } }
            );
        };

        res.json(deletedPoll);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/vote-add', auth, async (req, res) => {
    try {
        const { pollId, image } = req.body;

        const updatedPoll = await Poll.findById(pollId);
        if (image === 'one') {
            updatedPoll.imageOneVotes++;
            updatedPoll.votedForImageOne.push(req.user);
        } else {
            updatedPoll.imageTwoVotes++;
            updatedPoll.votedForImageTwo.push(req.user);
        }
        await updatedPoll.save();

        res.json(updatedPoll);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/vote-remove', auth, async (req, res) => {
    try {
        const { pollId, imageVotes, image } = req.body;

        const updatedPoll = await Poll.findById(pollId);
        if (image === 'one') {
            updatedPoll.imageOneVotes--;
            await Poll.updateOne(
                { '_id': pollId }, 
                { $pull: { 'votedForImageOne' : req.user } }
            );
        } else {
            updatedPoll.imageTwoVotes--;
            await Poll.updateOne(
                { '_id': pollId }, 
                { $pull: { 'votedForImageTwo' : req.user } }
            );
        }
        await updatedPoll.save();

        res.json(updatedPoll);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;