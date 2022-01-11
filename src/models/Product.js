const mongoose = require("mongoose")
const schema = mongoose.Schema

const productSchema = schema({
    name: String,
    category:String,
    price: {type:Number, default:0},
    imgUrl: String,
},{
    timestamps:true,
    versionKey:false
})//timestamps guarda fecha de creacion y fecha de ultimo login. versionKey no se.

module.exports = mongoose.model("Product", productSchema)
