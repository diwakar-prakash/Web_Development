import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3000;

const serverListening = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("SERVER UP BABY");
        })
    }
    catch( err ) {
        console.log("SERVER CRASHED");
    }
}

serverListening();