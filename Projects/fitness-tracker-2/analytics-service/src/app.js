import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import analyticsRoutes from './routes/analytics.routes.js';
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

export default app;