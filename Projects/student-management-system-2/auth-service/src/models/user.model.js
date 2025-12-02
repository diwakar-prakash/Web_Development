import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["student", "teacher", "admin"],
        default : "student"
    }
},
{timestamps : true}
)

export default mongoose.model("Users_In_Student-management-system-2", userSchema);