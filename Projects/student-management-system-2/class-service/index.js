import cors from 'cors';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 3003;

const serverListening = async () => {
    try {
        await connectDB();
        app.listen(PORT , () => {
            console.log('SERVER UP BABY');
        })
    }
    catch ( err ) {
        console.log("SERVER CRASHED");
    }
}

serverListening();