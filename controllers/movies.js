const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('28721379fb90bd78a4d224a9cb6ddbcc')
const Review = require('../models/review.js');


function movies(app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(movieList => {
            moviedb.configuration().then(config => {
                moviedb.genreMovieList().then(genreList => {
                    var movies = movieList.results;
                    var genres = genreList.genres;
                    try {
                        // logic to add the base URL for images and the appropriate
                        // genre names to each movie object - i'm sure there's a better way
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
                    } catch(err) {console.log(err.message)}
                    res.render('movies-index', { movies: movies,
                     });
                })
            })
        }).catch(console.error)
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            // check if there is a movie trailer available
            if (movie.video) {
                moviedb.movieVideos({ id: req.params.id }).then(videos => {
                    movie.trailer_youtube_id = videos.results[0].key
                    renderTemplate(movie)
                })
            } else {
                renderTemplate(movie)
            }

            function renderTemplate(movie)  {
                Review.find({ movieId: req.params.id}).then(reviews => {
                    res.render('movies-show', { movie: movie, reviews: reviews });
                })
            }

        }).catch(console.error)
    })
}

module.exports = movies;
