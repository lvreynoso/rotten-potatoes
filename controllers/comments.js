const Comment = require('../models/comment.js')

function comments(app) {
    // new comment
    app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
        console.log(req.body);
        // let's build our own jQuery JSON parser because why the fuck not
        let submittedData = req.body;
        let parsedData = {};
        for (var i = 0; i < submittedData.length; i++) {
            parsedData[submittedData[i]['name']] = submittedData[i]['value'];
        }
        console.log(parsedData);
        Comment.create(parsedData).then(comment => {
            res.status(200).send({ comment: comment})
        }).catch((err) => {
            res.status(400).send({ err: err})
        })
    })

    app.delete('/movies/:movieId/reviews/:id/comments/:id', (req, res) => {
        console.log("Delete Comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
}

module.exports = comments;
