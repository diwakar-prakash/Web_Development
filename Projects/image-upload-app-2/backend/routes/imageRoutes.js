import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import Image from "../models/Image.js";
import authMiddle from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/postimage', authMiddle, upload.single("image"), async ( req , res ) => {
    try {
        const newImage = await Image.create({
            filename : req.file.filename,
            filepath : req.file.path,
            uploadedBy : req.user.id
        });

        res.status(201).json({ message : "The image has been uploaded.."});
    }
    catch ( err ) {
        res.status(500).json({ message : "There has been some error in uploading the image. Try again because image has not been uploaded..."});
    }
})

router.get('/yourimage', authMiddle, async( req, res ) => {
    try {
        const images = await Image.find({ uploadedBy : req.user.id });
        res.status(200).json(images);
    }
    catch ( err ) {
        res.status(404).json({ message : " There has been some error in accessing your post images "});
    }
})


// ye wala sare images dikhayega 

router.get('/', async (req, res) => {
    try {
        const allImages = await Image.find();
        res.status(200).json({
            message : "The following are all the images",
            imagees : allImages
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Difficulty in fetching all the images. Please try again..."
        })
    }
})

export default router;