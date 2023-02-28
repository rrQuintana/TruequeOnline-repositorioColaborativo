const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    
    nombre: String,
    apellido: String,
    foto: String,
    email: String,
    telefono: Number,
    direccion: String,
    contacto: String,
    calificacion: String,
    reportes: Number,
    
},
{
    timestamps: true,
});

module.exports = model('Usuario', usuarioSchema);