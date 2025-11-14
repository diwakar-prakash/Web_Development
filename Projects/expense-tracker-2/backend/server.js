import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 6002;


const connectToServer = async() => {
    try {
        await connectDB();
    
        app.listen(PORT, () => {
            console.log("SERVER IS LISTENING");
        });
    }
    catch ( err ) {
        console.log("SERVER NOT CoNNNECTED");
    }
}

connectToServer();