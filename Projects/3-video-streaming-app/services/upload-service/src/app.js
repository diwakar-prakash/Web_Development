import express from "express";
import uploadRoutes from './routes/upload.routes.js';

const app = express();
app.use(express.json());
app.use('/upload', uploadRoutes);

export default app;