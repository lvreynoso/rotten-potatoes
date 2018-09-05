const Comment = require('../models/comment.js')

function comments(app) {
    //new comment
    app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.status(200).send({ comment: comment})
        }).catch((err) => {
            res.status(400).send({ err: err})
        })
    })

    app.delete('/movies/:movieId/reviews/:id/comments/:id', function (req, res) {
        console.log("Delete Comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
}

module.exports = comments;
