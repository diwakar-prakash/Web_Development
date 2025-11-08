import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("The database has been connnected");
    }
    catch ( err ) {
        console.log("FAILED DATABASE CONNECTION")
    }
}

export default connectDB;