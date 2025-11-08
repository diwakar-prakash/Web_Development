import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';


import connectDB from "./config/db.js";
import urlRouter from './routes/urlRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', urlRouter);

const PORT = process.env.PORT || 5006;
const connection = async () => {
    try {
        await connectDB();
        app.listen(PORT, ()=> {
            console.log("Server is RUNNING...");
        })
    }
    catch ( err ) {
        console.log("NO-SERVER Connection");
    }
}

connection();