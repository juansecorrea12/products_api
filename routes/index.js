'use strict'

const express = require('express');
const api = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const productControllers = require('../controllers/product');

api.get('/products', productControllers.getProducts);
api.get('/products/:product_id', productControllers.getProduct);
api.post('/products', auth, productControllers.saveProduct);
api.put('/products/:product_id', auth, productControllers.updateProduct);
api.delete('/products/:product_id', auth, productControllers.deleteProduct);
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
api.get('/users', userCtrl.getUsers);
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso'});
})

module.exports = api;