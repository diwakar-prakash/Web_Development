import mongoose from "mongoose";

const userSchmea = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

export default mongoose.model("user_in_forum-discussion-app", userSchmea);