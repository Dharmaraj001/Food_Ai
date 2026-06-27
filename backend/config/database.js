const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then((con) =>{
        console.log(
    `MongoDB Connected
Host: ${mongoose.connection.host}
Database: ${mongoose.connection.name}`
);
    })
}

module.exports = connectDB;