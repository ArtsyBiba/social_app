const router = require('express').Router();
const User = require('../models/userModel');
const FriendsList = require('../models/friendsListModel');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { listName, friends } = req.body.newFriendsList;

        if (!listName) {
            return res
                .status(400)
                .json({ msg: 'List name is required.' });
        }
        if (friends.length < 1) {
            return res
                .status(400)
                .json({ msg: 'At least one friend is required.' });
        }

        const newFriendsList = new FriendsList({
            listName,
            friends,
            userId: req.user,
        });
        const savedFriendsList = await newFriendsList.save();
        
        const updatedUser = await User.findById(req.user);
        updatedUser.friendsLists.push(newFriendsList);
        await updatedUser.save();

        res.json(savedFriendsList);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const { friendsListId } = req.body;
        
        const deletedFriendsList = await FriendsList.findByIdAndDelete(friendsListId);

        await User.updateOne(
            { '_id': req.user }, 
            { $pull: { 'friendsLists' : friendsListId } }
        );

        res.json(deletedFriendsList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;