//User schema
const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")
const { timeStamp } = require("console")



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
    },
    avatar:{
        public_id:String,
        url: String
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordReseExpires:Date,
},
{timeStamp:true}
);

//Function to hash password
//pre("save") => runs before the data is saved
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordconfirm = undefined
})

//password compare
userSchema.methods.correctpassword = async function(
    candidatepassword, userpassword
){
    return await bcrypt.compare(candidatepassword, userpassword)
}

//checks whether the user's apssword changes after getting jwt token
//if yes, the old token is invalid and user must login it again
userSchema.methods.changepasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000, 10
        )
        return JWTTimestamp < changedTimestamp
    }
    return false;
}

//custom method to generate jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id:this._id}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}
    )
}

module.exports = mongoose.model("User", userSchema)