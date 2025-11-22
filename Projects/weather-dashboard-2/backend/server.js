import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

// now we are going to do some general stuff here 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 6003;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("Server is Listening...");
    })
}

startServer();