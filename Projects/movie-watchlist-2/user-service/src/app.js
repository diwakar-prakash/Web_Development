import express from "express";
import watchlistRoutes from "./routes/watchlist.routes.js";

const app = express();

app.use(express.json());

app.use('/api/user', watchlistRoutes);

export default app;