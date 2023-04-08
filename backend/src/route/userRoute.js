const express = require("express");
const { registerController, loginController, logoutController } = require('../controller/authController')

//router
const router = express.Router();

//Routes
//REGISTER
router.post("/register", registerController)
//LOGIN
router.post("/login", loginController)
//LOGOUT
router.post("/logout", logoutController)

module.exports = router;