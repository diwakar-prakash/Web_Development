import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE SUCCESSFULLY CONNECTED");
    }
    catch ( err ) {
        console.log("FAILED TO CONNECT TO DATABASE");
    }
}

export default connectDB;