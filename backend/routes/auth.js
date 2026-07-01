const express = require("express")
const router = express.Router();
const authcontroller = require("../controllers/authContoller")

router.post("/signup", authcontroller.signup)

module.exports = router;