// controllers/admin.js

const Review = require('../models/review')

function admin(app) {

  // NEW Comment
  app.get('/admin', (req, res) => {
    Review.find()
      .then(reviews => {
          res.render('admin', { reviews: reviews });
      })
      .catch(error => {
        console.log(error);
      });
  });

}

module.exports = admin;
