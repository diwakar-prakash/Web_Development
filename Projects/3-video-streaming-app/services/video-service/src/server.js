import app from "./app.js";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3005;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`SERVER IS UP FOR VIDEO SERVICE ON THE PORT ${PORT}`);
        })
    }
    catch ( err ) {
        console.log(`Server crashed of Video Service for the following reason
            
            ${err.message}`)
    }
}

startServer();