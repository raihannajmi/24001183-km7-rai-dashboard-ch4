const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");
const upload = require("../middleware/uploader");

// Users API
router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post(
  "/users/create",
  upload.array("photo"),
  dashboardController.createUser
);

module.exports = router;
