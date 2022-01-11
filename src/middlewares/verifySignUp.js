
const config = require("../config")
const checkRolesExist = (req, res, next) =>{
    if(req.body.role){
        console.log("paso el if")
        for(let i = 0; i<req.body.role.length; i++){
            if(!config.ROLES.includes(req.body.role[i])){
                return res.status(400).json({message:`Role ${req.body.role[i]} is invalid`})
            }
        }
    }
    next()
}

module.exports = {
    checkRolesExist
}