const dateFormat = require('dateformat');

module.exports = (app) => {

    const scrap = require('../../src/controllers/scrap');
    const juegos = require('../controllers/juegos.controllers');

    app.get('/', async (req, res) => {
        let games = await scrap.getGames();
        res.render('juegos', { games });
    })

    let timming = 60000 * 10;
    let service = setInterval(async () => {
        let games = await scrap.getGames();
        await juegos.almacenarJuegos(games);
        console.log('scraping -> ' + dateFormat());
    }, timming);

    app.get('/juegos', juegos.getGamePrices);

    app.get('/deleteAll', async (req, res) => {
        await juegos.deleteAllGames(req, res);
        res.redirect('/juegos');
    });

    app.get('/:titulo', juegos.getPrices);

} 