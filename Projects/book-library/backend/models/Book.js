import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    year:Number,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    } 
});

export default mongoose.model("Book", bookSchema);