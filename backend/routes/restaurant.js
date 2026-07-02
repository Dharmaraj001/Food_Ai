 const express = require("express")
 const router = express.Router();
 const {getAllrestaurent} = require("../controllers/restaurantController")

 router.route("/").get(getAllrestaurent)

 module.exports = router;