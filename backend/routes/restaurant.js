 const express = require("express")
 const router = express.Router();
 const {getAllrestaurent, getRestaurnt} = require("../controllers/restaurantController")

 router.route("/").get(getAllrestaurent)
 router.route("/:storeId").get(getRestaurnt)

 module.exports = router;