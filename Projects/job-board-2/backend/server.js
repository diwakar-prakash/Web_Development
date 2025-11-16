import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static("uploads"));

app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/dash', dashboardRoutes);

const PORT = process.env.PORT || 6002;

const serverListening = async () => {
    await connectDB();
    app.listen(PORT, ()=> {
        console.log(`The server is listening on port ${PORT}`);
    })
}

serverListening();