import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    role: {
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER"
    }
},
{ timestamps : true }
)

export default mongoose.model("User", authSchema);
