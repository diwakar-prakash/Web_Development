import express from "express";
import Comment from "../models/Comment.js";
import authMiddle from "../middleware/auth.js";
import Post from "../models/Post.js";

const router = express.Router();

// here we are going to create some of the routers for the comment section 
// 1. A user can post a comment on the photo or stuff
// 2. A user can delete a comment 
// 3. A user can check the comments on the post 


// here is the first route, that is going to post the comment on a post
router.post('/:postid', authMiddle, async ( req , res ) => {
    try {
        const { text } = req.body;

        const checkIfPostIdExists = await Post.findById(req.params.postid);

        if(!checkIfPostIdExists) {
            return res.status(401).json({
                message : "Bhai kahan comment karne ki koshish kar rahe ho, valid post to chun loo bhai"
            })
        }
        
        const commentKaro = await Comment.create({
            text : text, 
            post : req.params.postid,
            user : req.user.id
        })

        res.status(201).json({
            message : "Commented Successfully",
            comment : commentKaro.text
        })
    }

    catch ( err ) {
        res.status(404).json({
            message : "Comment Failed, Please Try Again"
        })
    }
}) 


// this router is going to get all the comments on the post 

router.get('/:postId', async ( req, res ) => {
    try {
        const allComments = await Comment.find({ post : req.params.postId }).populate("user", "username");

        res.status(200).json({
            message : "All the comments on the post are following",
            allComments
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error in getting the comments on the post"
        })
    }
})


// now we are going to delete the comment

router.delete('/:commentId', authMiddle, async ( req , res ) => {
    try {
        const comm = await Comment.findById(req.params.commentId);

        if(!comm) {
            return res.status(401).json({
                message : "There is no such comment"
            })
        }

        if(comm.user.toString() !== req.user.id) {
            return res.status(401).json({
                message : "Not Allowed"
            })
        }

        await comm.deleteOne();
        res.status(200).json({
            message : "Comment deleted"
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error in deleting comment"
        })
    }
})

export default router;