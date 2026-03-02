const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

// Register User Api- /api/auth/register
authRouter.post("/register",authController.userRegisterController);

// Login User Api- /api/auth/login
authRouter.post("/login",authController.userLoginController);

// Logout User Api- /api/auth/logout (protected route)
authRouter.post("/logout",authController.userLogoutController);

// Get User Data Api- /api/auth/get-me (protected route)
authRouter.get("/get-me",identifyUser,authController.getMeUserController);

module.exports = authRouter;
