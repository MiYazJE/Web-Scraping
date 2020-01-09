const cheerio = require('cheerio');
const request = require('request-promise');

const init = async () => {

    const $ = await request({
        uri: 'https://www.allkeyshop.com/blog/',
        transform: body => cheerio.load(body)
    });
    
    const webTitle = $('title');
    console.log(webTitle.html());
}

init();