const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/companydb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) //esos parámetros son porque tira warnings al correr
    .then(msj => console.log("connectedd to DB/companydb"))
    .catch(e=>console.log(`Error connection DB: ${e}`))

    