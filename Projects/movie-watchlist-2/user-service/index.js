import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 5000;

const serverListening = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is Listening");
        })
    }
    catch ( err ) {
        console.log("Server Crashed");
    }
}

serverListening();