const cheerio = require('cheerio');
const request = require('request-promise');
const dateFormat = require('dateFormat');

exports.getGames = async () => {

    let day = dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss");

    const juegos = [];

    const $ = await request({
        uri: 'https://www.allkeyshop.com/blog/',
        transform: body => cheerio.load(body)
    });
    
    const titles = $('#Soon .topclick-list-element-game-title');
    
    titles.each((index, element) => {
        juegos[index] = {
            titulo: $(element).text()
        };
    }) 

    const prices = $('#Soon .topclick-list-element-price');
    prices.each((index, element) => {
        juegos[index].precio = $(element).text().trim();
        juegos[index].fecha = day;
    })

    return juegos;
}