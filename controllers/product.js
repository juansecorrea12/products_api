'use strict'

const Product = require('../models/product');

const getProduct = ((req, res) => {
    let product_id = req.params.product_id;
    Product.findById(product_id, (err, product) => {  
        if(err) return res.status(500).send({ message: 'ha ocurrido un error en la petición'});
        if(!product) return res.status(404).send({message : 'No existe ese producto en la DB'});
        return res.status(200).send({product});
    })
})

const getProducts = ((req, res) => {
    let products = req.params.products;
    Product.find(products, (err, products) => {
        if (err) return res.status(500).send({message: 'ha ocurrido un error en el servidor'});
        if (!products) return res.status(404).send({message: 'No hay productos para mostrar'});
        return res.status(200).send({products});        
    })
})

const saveProduct = ((req, res) => {
    console.log('POST /api/products');
    console.log(req.body);

    let product = new Product();
    let {nombre, picture, price, category, description} = req.body;
    product.nombre = nombre;
    product.picture = picture;
    product.price = price;
    product.category = category;
    product.description = description;

    product.save((err, product_stored) => {
        err ? res.status(500).send({message: 'Error al guardar el producto'}) : 
        res.status(201).send({product : product_stored});
    });
})

const updateProduct = ((req, res) => {
    let product_id = req.params.product_id;
    let update_body = req.body;

    Product.findByIdAndUpdate(product_id, update_body, (err, product_update) => {
        if(err) return res.status(500).send({ message: 'ha ocurrido un error en la petición'});

        return res.status(200).send({product: product_update});
    });
})

const deleteProduct = ((req, res) => {
    let product_id = req.params.product_id;
    Product.findById(product_id, (err, product) => {
        if(err) return res.status(500).send({ message: 'ha ocurrido un error en la petición'});
        
        product.remove((err) => {
            if(err) return res.status(500).send({ message: 'ha ocurrido un erro en la petición'});
            return res.send({message : 'El producto ha sido eliminado'});
        })
    })
})

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}