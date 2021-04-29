'use strict'

const User = require('../models/user');
const service = require('../services');

const signUp = (req, res) => {
    let {email, password, displayName} = req.body; 
    const user = new User({
        email: email,
        displayName: displayName,
        password: password
    })
    user.save((err) => {
        if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});

        return res.status(201).send({
            token: service.createToken(user),
            message: 'Usuario creado con exito'
        })
    })
}

const signIn = (req, res) => {
    User.find({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({message: 'No existe ese usuario'});
        
        req.user = user;
        res.status(200).send({
            message: 'Te has logeado correctamente',
            token: service.createToken(user)
        });
    })
}

const getUsers = ((req, res) => {
    let users = req.params.users;
    User.find(users, (err, users) => {  
        if(err) return res.status(500).send({ message: 'ha ocurrido un error en la petición'});
        if(!users) return res.status(404).send({message : 'No existe ese usuario en la DB'});
        return res.status(200).send({users});
    })
})

module.exports = {
    signIn,
    signUp,
    getUsers
}