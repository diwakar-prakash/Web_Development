import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user_in_forum-discussion-app",
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "post_in_forum-discussion-app",
        required : true
    }, 
    text : {
        type : String,
        required : true
    }
})

export default mongoose.model("comment_in_forum-discussion-app", commentSchema);

