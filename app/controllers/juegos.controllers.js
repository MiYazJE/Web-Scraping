
const Juego = require('../model/juegos.model');

exports.almacenarJuegos = async (juegos) => {

    juegos.forEach(async (juego) => {

        let juegoExiste = await Juego.findOne({titulo: juego.titulo}, (err, juego) => {
            if (err) throw err;
            return juego;
        })

        if (!juegoExiste) {
            await Juego.create(juego, (err, juego) => {
                if (err) throw err;
                console.log('creando el titulo -> ' + juego.titulo);
            })
        }
        else {
            let newPrices = [...juego.precios, ...juegoExiste.precios];
            let newDates  = [...juego.fechas, ...juegoExiste.fechas];
            await Juego.update({
                titulo: juego.titulo
            }, {
                precios: newPrices, 
                fechas: newDates
            }, 
            (err, status) => {
                if (err) throw err;
                console.log('actualizando un el titulo -> ' + juego.titulo);
            })
        }

    });

}

exports.getAllGames = async (req, res) => res.send(await getEverything()); 

const getEverything = () => Juego.find({}, (err, users) => users);

exports.deleteAllGames = (req, res) => {
    Juego.deleteMany({}, (err, status) => console.log(status));
}

exports.getPrices = (req, res) => {
    Juego.findOne(req.params, (err, prices) => {
        res.status(200).send(prices);
    })
}

exports.getGameNames = async () => {
    let names = new Set();
    let all = await getEverything();
    names = all.map(game => game.titulo);
    return names;
}