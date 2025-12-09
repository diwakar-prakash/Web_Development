import cors from 'cors';
import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 3001;

const serverListening = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server UP BABY....`);
        })
    }
    catch ( err ) {
        console.log(`SERVER CRASHED DUE TO THE FOLLOWING REASON--
            
            ${err.message}`);
    }
}

serverListening();