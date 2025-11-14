import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    } ,
    amount : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ["income", "expense"],
        required : true,
    }, 
    category : {
        type : String
    },
    receipt : {
        type : String,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users_in_the_expense-tracker-application"
    } 
},
{ timestamps : true }
)

export default mongoose.model("Transaction_from_the_expense_tracker_application", transactionSchema);