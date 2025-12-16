import app from "./app.js";
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

const connectServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("SERVER UP BABY...");
        })
    }
    catch ( err ) {
        console.log(`Server CRASHED due to the following reason
            
            ${err.message}`)
    }
}

connectServer();