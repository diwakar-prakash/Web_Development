import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String
    },
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users_In_Student-management-system-2"
    },
    studentIds : [
        { 
            type : mongoose.Schema.Types.ObjectId, 
            ref : "students_in_student-management-system-2"
        }
    ],
    capacity : {
        type : Number,
        default : 30
    }
},
{ timestamps : true }
)

export default mongoose.model("class_in_student-management-system-2", classSchema);