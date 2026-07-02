
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")
const Restaurant = require("../models/restaurant")

exports.getAllrestaurent = catchAsyncErrors(async(req, res, next)=>{
    const apiFeatures = new APIFeatures(Restaurant.find(), req.query).search().sort()

    const restaurants = await apiFeatures.query
    res.status(200).json({
        status:"Success",
        count:restaurants.length,
        restaurant: restaurants
    })
})