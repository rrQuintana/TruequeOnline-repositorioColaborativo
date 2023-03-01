const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    
    nombre: String,
    apellido: String,
    telefono: Number,
    email: String,
    direccion: String,
    contacto: String,
    foto: String,
    calificacion: String,
    reportes: Number,
    
},
{
    timestamps: true,
});

module.exports = model('Usuario', usuarioSchema);