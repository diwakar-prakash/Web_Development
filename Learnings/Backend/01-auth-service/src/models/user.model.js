import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String
    },
    provider: {
        type : String,
        enum : ["local", "google"],
        default : "local"
    },
    providerId: {

    },
    role: {

    }
})