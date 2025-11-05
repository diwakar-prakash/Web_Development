import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import noteRoutes from './routes/noteRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`SERVER HAS BEEN CONNECTED ON THE PORT ${PORT}`);
})