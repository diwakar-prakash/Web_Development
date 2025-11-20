import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user_in_forum-discussion-app",
        required : true
    }
},
{ timestamps : true }
)

export default mongoose.model('post_in_forum-discussion-app', postSchema);