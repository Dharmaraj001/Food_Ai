//User schema
const mongoose = require("mongoose")

const validatr = require("validator")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

//Step = 2

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter you name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
    },
    email:{
        type: String,
        required: [true, "Please eneter your E-mail"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Enter valid E-mail"]
    },
    password: {
        type: String,
         required: [true, "Enter password"],
         minlength: 8,
         select: false
    },
    passwordconfirm: {
        type: String,
        required:[true, "Confirm Password"],
        validate: {
            validator: function(el){
                return el === this.password
            },
            message:"Passwords are not Same" 
        }
    },
    Phonenumber: {
        type:String,
        required: true,
        match: [/^[0-9]{10}$/, "Enter Valid Phone Number"],
    },
    role:{
        type: String,
        enum:["user", "admin"],
        default:"user"
    }
})