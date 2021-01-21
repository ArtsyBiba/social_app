const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');
const Poll = require('../models/pollModel');

router.post('/upload', async (req, res) => {
    try {
        let { image, question, friendlist } = req.body;

        if (!question || !friendlist) {
            return res
                .status(400)
                .json({ msg: 'Not all required fields have been entered.' });
        }
        if (!image) {
            return res
                .status(400)
                .json({ msg: 'Image is required.' });
        }

        const uploadedResponse = await cloudinary.uploader.upload(image, {
            upload_preset: 'social_app'
        });
        
        const imageUrl = uploadedResponse.secure_url;
        console.log(imageUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;