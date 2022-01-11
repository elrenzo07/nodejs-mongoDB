const express = require("express")
const router = express.Router()
const productsCtrl = require("../controllers/products.controller")
const authJwt = require("../middlewares/authJwt")

router.get("/",[authJwt.verifyToken, authJwt.isAdmin] ,productsCtrl.getProducts)
router.post("/", productsCtrl.createProduct)
router.get("/:productId", productsCtrl.getProductById)
router.put("/:productId", productsCtrl.updateProductById)
router.delete("/:productId", productsCtrl.deleteProductById)

module.exports = router