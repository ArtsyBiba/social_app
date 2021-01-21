const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');

// upload image to cloudinary
router.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'social_app'
        });
        console.log(uploadedResponse)
        res.json({msg: 'yay'})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;