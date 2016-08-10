var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use('/movies', require('./controllers/movieRoutes'));
//serve state files
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
