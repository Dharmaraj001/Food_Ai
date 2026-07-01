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