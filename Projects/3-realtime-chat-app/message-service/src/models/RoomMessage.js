import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    senderId: {
        type : String,
        required: true
    },
    username: {
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

export default mongoose.model('Room-3-realtime-chat-app', roomSchema);