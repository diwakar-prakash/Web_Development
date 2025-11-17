import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Products_in_e-commerce-2_application"
    },
    quantity : {
        type : Number,
        default : 1,
        min : 1
    }
}, {_id : false});

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users_in_e-commerce-2_application",
        unique : true,
        required : true
    },
    items : {
        type : [cartItemSchema],
        default : []
    }
})

export default mongoose.model("Carts_in_e-commerce-2_application", cartSchema);

