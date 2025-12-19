import videoRoutes from "./routes/video.routes.js";
import express from "express";

const app = express();

app.use(express.json());
app.use('/video', videoRoutes);

export default app;