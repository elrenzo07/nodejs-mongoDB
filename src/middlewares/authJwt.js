const config = require("../config")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Role = require("../models/Role")


const verifyToken = async (req, res, next) =>{
try {
    const token = req.headers["x-access-token"]
    console.log(token)
    if(!token) return res.status(403).json({message:"Not provided token"})
    const idJwt = jwt.verify(token, config.token)
    req.userId = idJwt.id; //esto es para poder llamar desde el siguiente middleware con req.userId
    const userDB = await User.findById(idJwt.id, {password:false})
    if(!userDB) return res.status(404).json({message:"Not found user"})
    next()
} catch (error) {
    res.status(500).json({message:"Unauthorizaded"})
}
}

const isAdmin = async (req, res, next) =>{
    const userDB = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in:userDB.role}})

    for(i=0; i< roles.length;i++){
        if(roles[i].name =="admin"){
            next()
            return
        }
    }
    return res.status(403).json({message:"Require admin role"})
}

const isModerator = async (req, res, next) =>{
    
    next()
}

module.exports = {
    verifyToken,
    isAdmin,
    isModerator
}