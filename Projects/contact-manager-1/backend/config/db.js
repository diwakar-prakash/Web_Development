import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("The Database has been connected...");
    }
    catch ( err ) {
        console.log("DATABASE NOT CONNECTED........");
    }
} 

export default connectDB;