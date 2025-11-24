
import app from "./src/app.js";
import dotenv from 'dotenv';
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startserver = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server Is Up Baby");
        })
    }
    catch ( err ) {
        console.log("SERVER Not Connected");
    }
}

startserver();