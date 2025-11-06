import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO-DB Database has been connected")
    } catch (err) {
        console.log("Database not connected");
    }
}

export default connectDB;