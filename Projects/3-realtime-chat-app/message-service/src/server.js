import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import DMRoutes from './routes/dm.routes.js';
import RoomRoutes from './routes/room.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', ( req, res ) => {
    res.status(200).json({
        message : "Everything is okay in the Message-Service"
    })
})

app.use('/messages/room', RoomRoutes);
app.use('/messages/dm', DMRoutes);

const PORT = process.env.PORT || 3003;

const connectingServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is Up on the port ${PORT} for the Message-service`);
        })
    }
    catch ( err ) {
        console.log(`Server Crashed for the Message-Service due to the following reason 
            
            ${err.message}`);
    }
}

connectingServer();