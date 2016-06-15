var express = require('express');
var request = require('request');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);


app.get('/', function(req, res) {
  res.render('indexMain.ejs');
});

// app.get('/results', function(req, res) {
//   res.render('results.ejs');
// })

app.get('/:search', function(req, res) {
  request({
    url: 'http://www.omdbapi.com',
    qs: {
      s: req.query.q
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      res.render('results.ejs', { results: data.Search })
    }
  })
})

app.get('/movies/:imdbID', function(req, res) {
  request({
    url: 'http://www.omdbapi.com/',
    qs:{
      i: req.params.imdbID
    }

  },function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      res.render('movies.ejs', {movie: data})
    }
  })
console.log(req.params.imdbID);
})



var server = app.listen(process.env.PORT || 3000);

module.exports = server;
