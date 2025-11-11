import express from "express";
import Post from "../models/Post.js";
import multer from "multer";
import authMiddle from "../middleware/authMiddleware.js";

const router = express.Router();



// ye bhai get request ka hai

router.get('/', authMiddle ,async ( req , res ) => {
    try {
        const allPosts = await Post.find().populate("author", "name email");
        res.status(200).json({ message : allPosts })
    }
    catch ( err ) {
        res.status(404).json({ message : err.message });
    }
})


// post karne ke liye 

const storage = multer.diskStorage({
    destination : 'uploads/',
    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


router.post('/upload', authMiddle, upload.single('image') ,async ( req , res ) => {
    try {

        const { title, content } = req.body;

        const postKoUploadKarna = await Post.create({
            title, 
            content,
            image : req.file ? `/uploads/${req.file.filename}` : null,
            author : req.user.id
        })
        
        res.status(201).json({ 
            message : "Bhai Post ho gaya",
            titleinfo : postKoUploadKarna.title,
            contentinfo : postKoUploadKarna.content,
            imageinfo : postKoUploadKarna.image,
            authorinfo : postKoUploadKarna.author
        })


    }
    catch ( err ) {
        res.status(404).json({ message : err.message })
    }
})


export default router;