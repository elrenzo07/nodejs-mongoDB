const express = require("express")
const authCtrl = require("../controllers/auth.controller")
const router = express.Router()

router.post("/", authCtrl.signIn)
//router.post("/signup",authCtrl.signUp) //ahora está en user.routes.js

module.exports = router