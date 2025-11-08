import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    longUrl : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        required : true,
        unique : true
    },
    urlCode : {
        type : String,
        required : true,
        unique : true
    },
    date : {
        type : Date,
        default : Date.now
    },

});

export default mongoose.model("URL_SHORTENER", urlSchema);