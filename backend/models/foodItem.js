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
              
    }
})