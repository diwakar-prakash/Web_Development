import RoomMessage from "../models/RoomMessage.js";

export const getMessages = async ( req , res , next ) => {
    try {
        const room = req.params.room;

        if(!room) {
            return res.status(400).json({
                message : "Room is required"
            })
        }

        const messages = await RoomMessage.find({ room }).sort({ createdAt : 1 });

        res.status(200).json({
            message: "The following are all the messages found for that room",
            messages
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error in getting the messages of the ROOM"
        })
    }
}


export const postMessage = async ( req, res, next ) => {
    try {
        const room = req.params.room;
        const { senderId, username, text} = req.body;

        if(!room || !senderId || !username || !text ) {
            return res.status(401).json({
                message : "Credentials missing"
            })
        }

        const postMessage = await RoomMessage.create({
            room,
            senderId,
            username,
            text
        })

        res.status(201).json({
            message : "Message of the room successfully saved in the database"
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Error in posting the message to the room database"
        })
    }
}