import express from "express";
import cors from 'cors';
import passport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/auth', authRoutes);

export default app;
