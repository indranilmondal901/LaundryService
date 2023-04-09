const express = require("express");
const { registerController, loginController, logoutController } = require('../controller/authController')
const auth = require('../middlewire/auth');

//router
const router = express.Router();

/*:::::::::::Routes :::::::::::::*/
//REGISTER
router.post("/register", registerController)
//LOGIN
router.post("/login", loginController)
//LOGOUT
router.post("/logout",auth, logoutController)

module.exports = router;