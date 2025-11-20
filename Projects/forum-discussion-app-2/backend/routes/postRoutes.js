import express from "express";
import authMiddle from "../middleware/auth.js";
import uploadMiddle from "../middleware/upload.js";


import User from "../models/User.js";
import Post from "../models/Post.js";


// here we are going to create some routes for the posting purpose
// 1. user can post the image on twitter and stuff
// 2. you can get all the images.
// 3. you can get all the images that you posted
// 4. you can delete a post if it is posted by you

const router = express.Router();

// here we are going to create the post image and stuff for the user 

router.post('/post', authMiddle, uploadMiddle.single("image"), async ( req , res ) => {
    try {
        const { title, content } = req.body;

        const createPost = await Post.create({
            title,
            content,
            image : req.file ? req.file.path : null,
            author : req.user.id  
        });

        res.status(201).json({
            message : "Post Created",
            createPost
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "There has been some error in uploading the post, please try again"
        })
    }
})


// now we are going to get all the posts so that users see all the posts 

router.get('/', async ( req, res ) => {
    try {
        const allPosts = await Post.find().populate('author', 'username email');
        res.status(200).json({
            message : "The following are all the posts",
            allPosts
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error came in getting The posts"
        })
    }
})


// now we are going to create a route so that if the user, has posted some shit, he can see it

router.get('/myposts', authMiddle, async ( req, res ) => {
    try {
        const allPosts = await Post.find({ author : req.user.id }).populate("author", "username email");
        res.status(200).json({
            message : "Here are all your posts",
            allPosts
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error came while getting your posts."
        })
    }
})

// if a user wants to delete some of his posts, then this is the following that is going to happen

router.delete('/:id', authMiddle, async ( req, res ) => {
    try {
        const particularPost = await Post.findById(req.params.id);
        if(!particularPost) {
            return res.status(401).json({
                message : "Bro, stop playing. There is no such post with the post id given by you"
            })
        }

        // check ki banda us post ko own to karta hai ya nahi. I did this mistake of not checking it 

        if(particularPost.author.toString() !== req.user.id) {
            return res.status(401).json({
                message : "The Post doesn't belong to you. Hence you can't delete it"
            })
        }


        await particularPost.deleteOne();
        res.status(200).json({
            message : "Post deleted successfully"
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "There has been some error due to which the post wasn't deleted. Please check for the post"
        })
    }
})

export default router;