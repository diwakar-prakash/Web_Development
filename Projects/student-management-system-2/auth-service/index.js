import dotenv from 'dotenv';
import cors from 'cors';
import app from './src/app.js';
import connectDB from './src/config/db.js';


dotenv.config();
app.use(cors());

const Port = process.env.PORT || 3001;

const serverRunning = async () => {
    try {
        await connectDB();
        app.listen(Port, ()=> {
            console.log("SERVER IS UP BABY");
        })
    }
    catch ( err ) {
        console.log("Server Crashed");
    }
}

serverRunning();

