import jwt from "jsonwebtoken";
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);

// connecting the server so that server can listen

const PORT = process.env.PORT || 6002;

const connectingWithServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("The SERVER is listening");
        })
    }
    catch ( err ) {
        console.log("SERVER CONNECTION FAILED");
    }
}
connectingWithServer();