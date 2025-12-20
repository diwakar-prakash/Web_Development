import express from "express";
import appRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use('/', appRoutes);

export default app;