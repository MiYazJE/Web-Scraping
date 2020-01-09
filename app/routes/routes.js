module.exports = (app) => {

    const scrap = require('../../src/controllers/scrap');
    const juegos = require('../controllers/juegos.controllers');

    app.get('/', async (req, res) => {
        let juegos = await scrap.getGames();
        console.log(juegos);
        res.render('juegos', { juegos });
    })

    app.get('/juegos', juegos.getGamePrices);

} 