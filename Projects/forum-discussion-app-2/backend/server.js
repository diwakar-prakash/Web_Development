import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 6003;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is listening");
        })
    }
    catch ( err ) {
        console.log("Error in Connecting to the SERVER");
    }
}

startServer();