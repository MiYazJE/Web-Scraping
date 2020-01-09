
const Juego = require('../model/juegos.model');

exports.almacenarJuegos = (juegos) => {

    juegos.forEach(juego => {
        Juego.create(juego, (err, juego) => {
            if (err) throw err;
        })
    });

}

exports.getGamePrices = (req, res) => Juego.find({}, (err, users) => res.send(users));