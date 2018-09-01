const Comment = require('../models/comment.js')

function comments(app) {
    //new comment
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`)
        }).catch((err) => {
            console.log(err.message)
        })
    })

    app.delete('/reviews/comments/:id', function (req, res) {
        console.log("Delete Comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
}

module.exports = comments;
