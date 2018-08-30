const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const methodOverride = require('method-override');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

/*
let reviews = [
  { title: "Great Review" },
  { title: "Next Review" },
  { title: "The Prestige"}
]
*/
/*
app.get('/', (req, res) => {
  res.render('home', { msg: 'Hello World!' });
})
*/

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews});
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
    // console.log(req.body);
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
      res.render('reviews-show', {review: review})
  }).catch((err) => {
      console.log(err.message);
  })
});

app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review})
    })
})

// "Update" route
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        }).catch(err => {
            console.log(err.message)
        })
})

app.delete('/reviews/:id', (req, res) => {
    console.log('Delete review');
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch(err) {
        console.log(err.message);
    }
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
