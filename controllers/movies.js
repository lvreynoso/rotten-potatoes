const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('28721379fb90bd78a4d224a9cb6ddbcc')

function movies(app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {
                movies: response.results
            });
        }).catch(console.error)
    })
}

module.exports = movies;
