const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const schema = mongoose.Schema

const userSchema = schema({
    userName:{type:String, unique:true},
    email:{type:String, unique:true},
    password:{type:String, required:true},
    role:[{ref:"Role", type:schema.Types.ObjectId}]
},{
    timestamps:true,
    versionKey:false
})

userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

userSchema.statics.comparePassword = async (recievedPassword,password) =>{
    return await bcrypt.compare(recievedPassword, password) 
}

module.exports = mongoose.model("User", userSchema)