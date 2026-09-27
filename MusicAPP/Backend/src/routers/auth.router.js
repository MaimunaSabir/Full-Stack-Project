const express = require("express");
const authController = require("../controllers/auth.controller.js")
const authmiddleware = require("../middlewares/authmiddleware.js")

const router = express.Router();

router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/logout",authController.logout);
router.get("/getUser",authmiddleware.auth,authController.getMe);




module.exports = router;