import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    city : {
        type : String,
        required : true
    },
    temperature : {
        type : Number,
        required : true
    },
    description : {
        type : String
    },
    humidity : {
        type : Number
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users_in_weather-dashboard-2",
        required : true
    }
}, { timestamps : true })

export default mongoose.model("weather_in_weather-dashboard-2", weatherSchema);