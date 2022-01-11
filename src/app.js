const express = require("express")
const app = express()
const morgan = require("morgan")
const routerCtrl = require("./routes/products.routes")
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")

const createRoles = require("./libs/initConfig")
createRoles();

app.use(morgan("dev"))
app.use(express.json()) //para que pueda entender objetos json que llegan al servidor

const pkg = require("../package.json")

app.set("pkg", pkg)
app.get("/",(req,res)=>{
    res.status(200).send({
        author:app.get("pkg").author,
        description:app.get("pkg").description,
        version:app.get("pkg").version
    })
})

app.use("/products",routerCtrl)
app.use("/user/signin",authRoutes)
app.use("/user/signup",userRoutes)

module.exports = app