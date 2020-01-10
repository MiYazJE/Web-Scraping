const mongoose = require('mongoose');

const juegoSchema = mongoose.Schema({
    titulo: String,
    precios: [String],
    fechas: [String]
}, {
    timestamps: true
})

module.exports = mongoose.model('juego', juegoSchema);