const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllrestaurent,
  createRestaurant,
  getRestaurnt,
  deleteRestaurant,
} = require("../controllers/restaurantController");

const { protect } = require("../controllers/authController.js");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

const menuRoutes = require("./menu");

router
  .route("/")
  .get(getAllrestaurent)
  .post(protect, authorizeRoles("admin"), createRestaurant);

router
  .route("/:storeId")
  .get(getRestaurnt)
  .delete(protect, authorizeRoles("admin"), deleteRestaurant);

router.use("/:storeId/menus", menuRoutes);

module.exports = router;
