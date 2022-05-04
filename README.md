# Exa-Anime-Scraper
Npm para sacar información de animes en español.

Todos los datos vienen de la pagina [AnimeFenix](https://www.animefenix.com/).

Todas las funciones son asyncronas, por lo que se tiene que utilizar `async - await` o `then - catch`.

## Instalación
```js
const AnimeScraper = require('exa-anime-scraper');
const Anime = new AnimeScraper.animefenix();
```

## Metodos
- #### search(query)
```js
const data = await Anime.search('wonder egg priority');
```

- #### getPopular()
```js
const data = await Anime.getPopular();
```

- #### getLatest()
```js
const data = await Anime.getLatest();
```

- #### getFromLink()
```js
const data = await Anime.getFromLink('https://www.animefenix.com/kawaii-dake-ja-nai-shikimori-san');
```

## Información extra
Discord: Exaedro#7841
