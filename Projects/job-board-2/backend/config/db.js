import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB connected");
    }
    catch ( err ) {
        console.log("DATABASE Not Connected");
    }
}

export default connectDB;

