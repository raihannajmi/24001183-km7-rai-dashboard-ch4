const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");

// Users API
router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post("/users/create", dashboardController.createUser);

module.exports = router;
