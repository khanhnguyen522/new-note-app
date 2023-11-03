const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.post("/refresh", userController.requestRefreshToken);
router.post("/logout", middlewareController.verifyToken, userController.logout);

router.post(
  "/profile",
  middlewareController.verifyToken,
  userController.editUser
);

module.exports = router;
