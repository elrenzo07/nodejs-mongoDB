const Product = require("../models/Product")

const createProduct = (req, res)=>{

    const newProduct = new Product({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        imgUrl:req.body.imgUrl})

    const productSaved = newProduct.save((err,productStored)=>{
        if(err) res.status(500).send({message:`Error al salvar: ${err}`})
        res.status(200).send(productStored);
    })
    //res.status(201).send(productSaved)
}

const getProducts = (req, res)=>{
    Product.find({}, (err, items)=>{
        if(err) return res.status(500).send({message:`Errar al realizar petición: ${err}`});
        if(!items) return res.status(404).send({message:`No existe el producto buscado`});
        res.status(200).send(items);
    })
}

const getProductById = (req, res)=>{
    Product.findById(req.params.productId, (err, item)=>{
        if(err) return res.status(500).send({message:`Errar al realizar petición: ${err}`});
        if(!item) return res.status(404).send({message:`No existe el producto buscado`});
        res.status(200).send({item});
    })
}

const updateProductById = (req, res)=>{

    Product.findByIdAndUpdate(req.params.productId, req.body, {new:true}, (err, productUpdated)=>{
        if(err) return res.status(500).send({message:`Ha ocurrido un error al actualizar: ${err}`})
        res.status(200).send({message:`Producto Actualizado`, productUpdated})
    })
}

const deleteProductById = (req, res)=>{
    const id = req.params.productId
    console.log(id)
    const productDeleted = Product.findByIdAndDelete(id, err=>{
        if(err) res.status(500).send({message:"error al borrar"})
        res.json({message:"recurso eliminado"})
    })
    //if(productDeleted) console.log("producto borrado")
}

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    updateProductById,
    deleteProductById
}