import express from "express";
import authMiddle from "../middleware/auth.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// Here we are going to create a dashboard for the Router 
// 1. user can see his posts 

router.get('/posts', authMiddle, async ( req , res ) => {
    try {
        const findAllPosts = await Post.find({ author : req.user.id });
        res.status(200).json({
            message : "Here are all your posts",
            findAllPosts
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Error getting your posts"
        })
    }
})



export default router;