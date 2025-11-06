import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import BookRouter from "./routes/bookRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", BookRouter);
app.use("/api/categories", CategoryRouter);

const jodo = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server is listening on the port ${PORT}`);
    });
  } catch (err) {
    console.log("The database is not connected");
  }
};

jodo();