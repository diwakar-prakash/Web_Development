import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        default : "General"
    },
    image : {
        type : String
    },
    stock : {
        type : Number
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users_in_e-commerce-2_application",
    }
},
{ timestamps : true }
)

export default mongoose.model("Products_in_e-commerce-2_application", productSchema);