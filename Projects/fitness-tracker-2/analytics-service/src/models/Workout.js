import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    caloriesBurned : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
}, { timestamps : true }
)

export default mongoose.model("Workout_in_Fitness-Tracker-2", workoutSchema);
