const express = require("express")
const router = express.Router()
const authJwt = require("../middlewares/authJwt")
const authCtrl = require("../controllers/auth.controller")
const verifyRole = require("../middlewares/verifySignUp")

router.post("/",[authJwt.verifyToken,authJwt.isAdmin, verifyRole.checkRolesExist], authCtrl.signUp)

module.exports = router