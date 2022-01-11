const User = require("../models/User")
const Role = require("../models/Role")
const config = require("../config")
const jwt = require("jsonwebtoken")
//const { Mongoose } = require("mongoose")

const signUp =async (req, res) =>{
    //primero consulta si existe el usuario en la DB, si no existe entonces crea uno nuevo.
    const userExistent = await User.find({userName: req.body.userName})
    if(userExistent.length>0){if(userExistent[0].userName==req.body.userName) return res.json("El usuario ya se encuentra en uso");}
    const emailExistent = await User.find({email: req.body.email})
    if(emailExistent.length>0){if(emailExistent[0].email==req.body.email) return res.json("El email ya se encuentra en uso");}
    
    //crea usuario
    const newUser = new User({
        userName:req.body.userName,
        email:req.body.email,
        password: await User.encryptPassword(req.body.password)
    })
    if(req.body.role){
        const foundRoles = await Role.find({name:{$in:req.body.role}})
        newUser.role = foundRoles.map(role => role._id)
    }else{
        const userRole = await Role.findOne({name:"user"})
        newUser.role = [userRole._id]
    }


    //guardar y enviar token
    const savedUser = newUser.save()
    const token = jwt.sign({id: savedUser._Id},config.token, {expiresIn:86400})
    res.json({token})
}

const signIn = async (req, res) =>{
    //supongo un logeo con email y password
    const userFound = await User.findOne({email:req.body.email})
    if(!userFound) return res.status(400).json({messaje:"User not found"})
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if(!matchPassword) return res.status(401).json({token:null,message:"Invalid password"})
    
    const token = jwt.sign({id:userFound._id}, config.token,{expiresIn:86400})
    res.status(200).json({token})
}

module.exports = {
    signIn,
    signUp
}