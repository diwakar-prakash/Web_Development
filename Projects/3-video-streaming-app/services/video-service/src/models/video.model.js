import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description: {
        type : String
    },
    status : {
        type: String,
        enum: ["UPLOADING", "PROCESSING", "READY", "FAILED"],
        default : "UPLOADING"
    },
    visibility : {
        type : String,
        enum: ["PUBLIC", "PRIVATE"],
        default : "PUBLIC"
    },
    thumbnailUrl : {
        type : String,
        required : true
    },
    videoUrls : {
        type : Map,
        of : String,
        default : {}
    },
    views : {
        type : Number,
        default : 0
    },
    ownerId: {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
},
{ timestamps : true }
)

export default mongoose.model("video", videoSchema);

