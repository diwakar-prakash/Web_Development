import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const serverRunning = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("SERVER IS UP BABY of the image ANALYTICS-SERVICE");
        })
    }
    catch ( err ) {
        console.log("SERVER CRASHED OF ANALYTICS-SERVICS");
    }
}

serverRunning();