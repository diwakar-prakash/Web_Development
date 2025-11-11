import mongoose, { SchemaType } from "mongoose";


const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users_in_blog_website",
        required : true
    },
    image : {
        type : String
    }
},
{timestamps : true} 
)

export default mongoose.model("posts_in_blog_website", postSchema);