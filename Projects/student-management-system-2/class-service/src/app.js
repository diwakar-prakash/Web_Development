import express from "express";
import classRoutes from './routes/class.routes.js';


const app = express();

app.use(express.json());

app.use('/api/class', classRoutes);

export default app;