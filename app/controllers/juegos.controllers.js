
const Juego = require('../model/juegos.model');

exports.almacenarJuegos = (juegos) => {

    juegos.forEach(juego => {
        Juego.create(juego, (err, juego) => {
            if (err) throw err;
        })
    });

}

exports.getGamePrices = (req, res) => Juego.find({}, (err, users) => res.send(users));

exports.deleteAllGames = (req, res) => {
    Juego.deleteMany({}, (err, status) => console.log(status));
}

exports.getPrices = (req, res) => {
    Juego.find(req.params, (err, prices) => {
        res.status(200).send(prices);
    })
}