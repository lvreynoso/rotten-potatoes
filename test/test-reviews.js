// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../');
const should = chai.should();
const Review = require('../models/review');
const sampleMovieId = "69420"
const sampleReview =     {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie.",
    "rating": "★★★★",
    "movieId": sampleMovieId
}

chai.use(chaiHttp);

describe('Reviews', ()  => {

  // TEST INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /reviews/new GET', (done) => {
    chai.request(server)
      .get(`/movies/${sampleMovieId}/reviews/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST SHOW
  it('should show a SINGLE review on /reviews/<id> GET', (done) => {
    var review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(server)
        .get(`/movies/${sampleMovieId}/reviews/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });

  // TEST EDIT
  it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
  var review = new Review(sampleReview);
   review.save((err, data) => {
     chai.request(server)
       .get(`/movies/${sampleMovieId}/reviews/${data._id}/edit`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
   });
  });

  // TEST CREATE
  it('should create a SINGLE review on /reviews POST', (done) => {
    chai.request(server)
        .post(`/movies/${sampleMovieId}/reviews`)
        .send(sampleReview)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST UPDATE
  it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
    var review = new Review(sampleReview);
    review.save((err, data)  => {
     chai.request(server)
      .put(`/movies/${sampleMovieId}/reviews/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
    var review = new Review(sampleReview);
    review.save((err, data)  => {
     chai.request(server)
      .delete(`/movies/${sampleMovieId}/reviews/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  after(() => {
      Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
        console.log(reviews)
        reviews.remove();
      })
    });

});
