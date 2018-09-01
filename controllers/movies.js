const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('28721379fb90bd78a4d224a9cb6ddbcc')

function movies(app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(movieList => {
            moviedb.configuration().then(config => {
                moviedb.genreMovieList().then(genreList => {
                    var movies = movieList.results;
                    var genres = genreList.genres;
                    try {
                        for (var i = 0; i < movies.length; i++) {
                            movies[i].baseUrl = config.images.secure_base_url
                            movies[i].genre_names = []
                            for (var j = 0; j < movies[i]["genre_ids"].length; j++) {
                                for (var k = 0; k < genres.length; k++) {
                                    if (genres[k]["id"] === movies[i]["genre_ids"][j]) {
                                        movies[i].genre_names.push(genres[k]["name"])
                                    }
                                }
                            }
                        }
                    } catch(err) {console.log(err.message);}
                    console.log(movies);
                    res.render('movies-index', { movies: movies,
                     });
                })
            })
        }).catch(console.error)
    })
}

module.exports = movies;
