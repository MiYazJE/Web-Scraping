const mongoose = require('mongoose');

const juegoSchema = mongoose.Schema({
    titulo: String,
    precio: String,
    fecha: String
}, {
    timestamps: true
})

module.exports = mongoose.model('juego', juegoSchema);