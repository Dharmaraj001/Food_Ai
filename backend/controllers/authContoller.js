//import required packages or files

const User = require("../models/User")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/sendToken")
const cloudinary = require("../config/cloudinary")

//SignUp
exports.signup = catchAsyncErrors(async(req, resizeBy), next=>{
    const [name, email, password, passwordconfirm, Phonenumber]
})