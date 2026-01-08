import app from "./app.js";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`SERVER IS UP BABY AT PORT ${PORT}`);
        })
    }
    catch ( err ) {
        console.log("SERVER CASHED");
    }
}
start();

