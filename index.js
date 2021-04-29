'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
    err ? console.log('Error al conectar a la DB') : console.log('Conexión a la base de datos establecida');
    app.listen(config.port, () => {
        console.log(`Servidor corriendo en el puerto ${config.port}`);
    })    
})
