import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import ContactRouter from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contact", ContactRouter);

const connect = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () => {
      console.log(`The SERVER is listening at the port ${PORT}`);
    });
  } catch (err) {
    console.log("The server is down due to some issues");
  }
};

connect();
