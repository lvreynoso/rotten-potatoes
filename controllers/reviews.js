const Review = require('../models/review.js');
const Comment = require('../models/comment.js');
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('28721379fb90bd78a4d224a9cb6ddbcc')

function reviews(app) {
    /*
    app.get('/', (req, res) => {
      Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        })
    });
    */

    // old code from part une
    /*
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', {});
    });

    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/reviews/${review._id}`);
        }).catch((err) => {
            console.log(err.message);
        })
    });
    */

    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id, (err, review) => {
            res.render('reviews-edit', {review: review})
        })
    });

    app.delete('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${req.params.movieId}`)
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // "Update" route
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${req.params.movieId}`)
            }).catch(err => {
                console.log(err.message)
            })
    });

    /*
     *  Part Deux only logic below
     */

    app.get('/movies/:movieId/reviews/new', (req, res) => {
        moviedb.movieInfo({ id: req.params.movieId }).then(movie => {
            res.render('reviews-new', { movieId: req.params.movieId, movie: movie })
        }).catch(err => {
            console.log(err.message);
        })
    })

    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            res.redirect(`/movies/${req.params.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    app.get('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findById(req.params.id).then((review) => {
          moviedb.movieInfo({ id: req.params.movieId}).then(movie => {
              Comment.find({ reviewId: req.params.id }).then(comments => {
              res.render('reviews-show', {review: review, comments: comments, movie: movie})
          })
        })
      }).catch((err) => {
          console.log(err.message);
      })
    });

}

module.exports = reviews;
