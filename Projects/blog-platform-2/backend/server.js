import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import express from "express";
import multer from "multer";
import cors from "cors";

import authenticationRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authenticationRoutes);
app.use('/api/post', postRoutes);

const PORT = process.env.PORT || 6001;
const serverHai = async () => {
    try {
        await connectDB();
        app.listen(PORT, ()=> {
            console.log("Server is Running");
        })
    } catch ( err ) {
        console.log("NO-SERVER CONNECTION");
    }
}

serverHai();