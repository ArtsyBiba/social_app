const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');
const Poll = require('../models/pollModel');
const User = require('../models/userModel');

router.post('/upload', async (req, res) => {
    try {
        let { imageOne, imageTwo, question, friendlist, userId } = req.body.newPollForUpload;

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
        const imageTwoUrl = uploadedResponseTwo.secure_url;

        const newPoll = new Poll({
            question,
            friendlist,
            imageOneUrl,
            imageTwoUrl,
            userId,
        });
        const savedPoll = await newPoll.save();
        
        const updatedUser = await User.findOne({ _id: userId });
        updatedUser.polls.push(newPoll);
        await updatedUser.save();

        res.json(savedPoll);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        let { pollId, userId } = req.body;
        
        const deletedPoll = await Poll.findByIdAndDelete(pollId);

        await User.updateOne(
            { '_id': userId }, 
            { $pull: { 'polls' : pollId } }
        );

        res.json(deletedPoll);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;