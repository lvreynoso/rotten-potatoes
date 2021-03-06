// 熊貓尿 ES6 module incompatibility
const reviews = require('./controllers/reviews.js');
const comments = require('./controllers/comments.js');
const movies = require('./controllers/movies.js');
const admin = require('./controllers/admin.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const methodOverride = require('method-override');

app.use(bodyParser.json());
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'))
app.use(express.static('public'))

reviews(app);
comments(app);
movies(app);
admin(app);

var server = app.listen(4000, () => {
    console.log('App listening on port 4000!')
})

module.exports = server;
