import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js'

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("SERVER UP BABY");
        })
    }
    catch ( err ) {
        console.log("SERVER CRASHED");
    }
}

startServer();