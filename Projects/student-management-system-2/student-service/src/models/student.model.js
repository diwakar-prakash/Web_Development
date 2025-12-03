import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    gender : {
        type : String,
        enum : ["male", "female", "other"],
        default : "other"
    },
    dob : {
        type : Date
    },
    photoUrl : {
        type : String
    },
    photoPublicId : {
        type : String
    }
},
{ timestamps : true }
)

export default mongoose.model("students_in_student-management-system-2", studentSchema);

