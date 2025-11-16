import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },  
    jobType : {
        type : String,
        enum : ["full-time", "part-time", "remote", "contract"],
        required : true
    },
    location : {
        type : String,
        required : true
    },
    skills : {
        type : [String]
    },
    salary : {
        type : Number
    },
    description : {
        type : String,
    },
    logo : {
        type : String
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User_IN_JOB-BOARD-2"
    }
})

export default mongoose.model('Jobs_In_JOB-Board-2', jobSchema);

