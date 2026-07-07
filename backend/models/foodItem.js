const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter a food item name"],
        trim: true,
        maxLength: [100, "Food item name cannot be more that 100 char"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        maxLength: [5, "enter valid food item price 0 - 99,999"],
        default:0.0
    },
    description:{
        type: Number,
        required: [true, "Please enter description"]
    },
    ratings: {
        type: Number,
        default : 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    menu : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    stock:{
        type: Number,
        required: [true, "Please enetr food item stock"],
        maxLength:[10, "fooditems stock cannot be more that 10"],
        default: 0
    },
    restaurant: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews: [
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true,
            },
            Commet:{
                type:String,
                required: true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("FoodItem", foodSchema)
//fooditems