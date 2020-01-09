module.exports = (app) => {

    const scrap = require('../../src/controllers/scrap');
    const juegos = require('../controllers/juegos.controllers');

    app.get('/', async (req, res) => {
        let games = await scrap.getGames();
        juegos.almacenarJuegos(games);
        res.render('juegos', { games });
    })

    app.get('/juegos', juegos.getGamePrices);

    app.get('/deleteAll', (req, res) => {
        juegos.deleteAllGames(req, res);
        res.redirect('/juegos');
    });

    app.get('/:titulo', juegos.getPrices);

} 