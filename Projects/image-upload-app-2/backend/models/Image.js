import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    filename : {
        type : String,
        required : true
    },
    filepath : {
        type : String, 
        required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "user_in_image_upload_application",
        required : true
    }
},
{ timestamps : true }
)

export default mongoose.model('image_in_image_upload_application', imageSchema );