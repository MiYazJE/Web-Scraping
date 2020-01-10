const dateFormat = require('dateformat');
const cheerio = require('cheerio');
const request = require('request-promise');
const juegos = require('../controllers/juegos.controllers');

module.exports = (app) => {

    app.get('/', async (req, res) => {
        let games = await juegos.getGameNames();
        res.render('juegos', { games });
    })

    let timming = 6000 * 10;
    let service = setInterval(async () => {
        let games = await scrapGames();
        await juegos.almacenarJuegos(games);
        console.log('scraping -> ' + dateFormat());
    }, timming);

    app.get('/juegos', juegos.getAllGames);

    app.get('/deleteAll', async (req, res) => {
        await juegos.deleteAllGames(req, res);
        res.redirect('/juegos');
    });

    app.get('/:titulo', juegos.getPrices);

    
} 

scrapGames = async () => {

    let day = dateFormat();

    const juegos = [];

    const $ = await request({
        uri: 'https://www.allkeyshop.com/blog/',
        transform: body => cheerio.load(body)
    });
    
    const titles = $('#Soon .topclick-list-element-game-title');
    
    titles.each((index, element) => {
        juegos[index] = {titulo: $(element).text()};
    }) 

    const prices = $('#Soon .topclick-list-element-price');
    prices.each((index, element) => {
        juegos[index].precios = [$(element).text().trim()];
        juegos[index].fechas = [day];
    })

    return juegos;
}