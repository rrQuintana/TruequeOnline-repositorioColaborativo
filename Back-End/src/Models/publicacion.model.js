const { Schema, model } = require('mongoose');

const publicacionSchema = new Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    categoria: { type: String },
    precio: { type: String, required: true },
    reportes: { type: Number, required: true },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
},
{
    timestamps: true
});

module.exports = model('Publicacion', publicacionSchema);