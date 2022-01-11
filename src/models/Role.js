const mongoose = require("mongoose")
const schema = mongoose.Schema

const roleSchema = schema({
    name:String
},{
    versionkey:false
})


module.exports = mongoose.model("Role", roleSchema)