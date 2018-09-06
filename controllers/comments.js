const Comment = require('../models/comment.js')

function comments(app) {
    // new comment
    app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
        // let's build our own jQuery JSON parser because why the fuck not
        let submittedData = req.body;
        let parsedData = {};
        for (var i = 0; i < submittedData.length; i++) {
            parsedData[submittedData[i]['name']] = submittedData[i]['value'];
        }
        Comment.create(parsedData).then(comment => {
            res.status(200).send({
                comment: comment
            })
        }).catch((err) => {
            res.status(400).send({
                err: err
            })
        })
    })

    app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', (req, res) => {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.log(err.message);
            res.status(400).send(err)
        })
    })
}

module.exports = comments;
