// application.js ===> configure express and middleware

//import packages
//create express app
//                  client=>app=>route=>response
//configure middlewares --> is a function runs bw req and res
//export the app

const express = require("express")
const app = express();

const auth = require("./routes/auth")
const restaurant = require("./routes/restaurant")

const cors = require("cors")

app.use(cors());
app.use(express.json())

app.use("/api/v1/users", auth)
app.use("/api/v1/eats/stores", restaurant)

module.exports=app;
