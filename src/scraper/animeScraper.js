const cheerio = require('cheerio');
const axios = require('axios');

const b = 'https://www.animefenix.com/';

class animefenix {
    constructor({baseUrl} = {}) {
        this.baseUrl = b;
    }
    
    async getFromLink(link) {
        if(link) {
            if(typeof link === 'string') {
                if(link.includes(this.baseUrl)) {
                    const response = await axios({ url: link });
                    let $ = cheerio.load(response.data);
    
                    const genres = [];
                    $('.container .genres a').each((i, elem) => {
                        genres.push(elem.children[0].data);
                    });
                    const details = [];
                    $('.container ul.has-text-light li').each((i, elem) => {
                        details.push($(elem).text());
                    })
    
                    const anime = {
                        title: $('h1').html(),
                        synopsis: $('.sinopsis').text(),
                        image: $('.container .image img').attr('src'),
                        genres: genres,
                        details: {
                            type: details[0].replace('Tipo: ', ''),
                            status: details[1].replace('Estado: ', ''),
                            episodes: details[2].replace('Episodios: ', ''),
                        }
                    }
                    return anime;
                } else {
                    throw new Error("The link isn't valid.");
                }
            } else {
                throw new Error("The link isn't string.");
            }
        } else {
            throw new Error("No link provied");
        }
    };

    async getLatest() {
        const response = await axios({ url: this.baseUrl });
        let $ = cheerio.load(response.data);
    
        const results = [];
        $('.page-home__latest-series .list-series .serie-card').each((i, elem) => {
            $ = cheerio.load($(elem).html())
            const anime = {
                title: $('.image a').attr('title'),
                url: $('.image a').attr('href'),
                image: $('.image a img').attr('src')
            }
            results.push(anime)
        })
        return results;
    }

    async getPopular() {
        const response = await axios({ url: this.baseUrl });
        let $ = cheerio.load(response.data);
    
        const result = []
    
        $('section.page-home__slider-container .serie-card').each((i, elem) => {
            $ = cheerio.load($(elem).html())
            const anime = {
                title: $('a').attr('title'),
                url: $('a').attr('href'),
                image: $('img').attr('src'),
            }
            result.push(anime)
        })
    
        return result;
    }

    async search(name) {
        if(name) {
            if(typeof name === 'string') {
                const response = await axios({ url: this.baseUrl + '/animes?q=' + name});
                let $ = cheerio.load(response.data);
    
                const animeLink = $('.serie-card .image a').attr('href');
                const anime = await this.getFromLink(animeLink);
    
                return anime;
            } else {
                throw new Error("Name type isn't string.");
            }
        } else {
            throw new Error("No name provied.");
        }
    };

}

module.exports = animefenix;
