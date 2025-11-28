import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true})

export default mongoose.model("Users_In_Movie-Watchlist-2", userSchema)