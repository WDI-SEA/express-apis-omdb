const express = require('express');
const app = express();
const request = require('request');
const expressEjsLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
// this adds some logging to each request
app.use(require('morgan')('dev'));
app.use(expressEjsLayouts);
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/results', function(req, res){
	let movie = req.query.movie;
	request('http://www.omdbapi.com/?apikey=a8822bb&s=' + movie, function(err, response, body){
		if(!err && response.statusCode === 200){
      let parsedJson = JSON.parse(body);
      res.render('results', { results: parsedJson.Search });
    }
    else {
      res.send(err);
  }});
})

app.get('/movies/:id', function(req, res) {
  let imdbID = req.params.id;
  request(`http://www.omdbapi.com/?apikey=a8822bb&i=${imdbID}`, function(err, response, body) {  
    if(!err && response.statusCode === 200){
      let parsedJson = JSON.parse(body);
      res.render('movie_details', { movie: parsedJson });
    }
    else {
      res.send(err);
    }
  });
})
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
