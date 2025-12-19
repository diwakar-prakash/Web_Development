import app from './app.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3004;

const serverListening = async () => {
    try {
        await 
    }
    catch ( err ) {
        console.log(`SERVER CRASHED DUE TO THE FOLLOWING REASON
            
            ${err.message}`);
    }
}

serverListening();