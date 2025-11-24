import express from "express";
import cors from 'cors';

import workoutRoutes from "./routes/workout.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/fitness', workoutRoutes);

app.use(errorHandler);

export default app;
