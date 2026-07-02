//import required packages or files

const User = require("../models/User")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/sendToken")
const cloudinary = require("../config/cloudinary")

//SignUp
exports.signup = catchAsyncErrors(async(req, res, next) =>{
    const {name, email, password, passwordconfirm, Phonenumber} = req.body;

    let avatar = []
    //avatar not provided
    if(!req.body.avatar || req.body.avatar === "/images/images.png"){
        avatar = {
            publc_id : "default",
            url : "/images/images.png"
        }
    } 
    else{
        const result = await cloudinary.UploadStream(req.body, avatar,{
            folder:"avatar",
            width:150,
            crop:"scale",
        })
        avatar ={
            publc_id:result.publc_id,
            url: result.url
        }
    }


    const user = await User.create({
            name, 
            email, 
            password, 
            passwordconfirm, 
            Phonenumber,
            avatar
    })
    sendToken(user, 200, res)
})

//  Login

exports.login = catchAsyncErrors(async(req, res, next) => {
    const{email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter valid email-id and password", 400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invald e-mail or password", 401))
    }

    const ispasswordMatched = await user.correctpassword(password, user.password)

    if(!ispasswordMatched){
        return next(new ErrorHandler("Invalid e-mail or password", 401))
    }
    sendToken(user, 200, res)
})
