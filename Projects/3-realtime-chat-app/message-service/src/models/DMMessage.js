import mongoose from "mongoose";

const dmMessageSchema = new mongoose.Schema({
    senderId: {
        type : String,
        required : true
    },
    receiverId: {
        type : String,
        required : true
    },
    text: {
        type : String,
        required: true
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
})

export default mongoose.model('dmschema_in_3-realtime-chat-app', dmMessageSchema);