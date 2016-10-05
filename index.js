//Requirements
var express = require('express');
var request = require('request');
var moviesCtrl = require("./controllers/movie");
var fs = require("fs");
var bodyParser = require('body-parser');

//Global Variables
var app = express();

//Set/Use Statements
app.set("view engine", "ejs");
app.use(require('morgan')('dev'));
app.use("/movie", moviesCtrl);
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', function(req, res){
  var qs = {
    s: req.query.q,
    plot: 'short',
    r: 'json'
  }
  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
    var data = JSON.parse(body);
    if(!error && response.statusCode == 200){
      res.render('results', {results: data.Search});
    } else {
      res.send("Nope! Didn't work. Looks like there was an error. :'(");
    }
  });
});

app.get('/favorites', function(req,res){
  var jsonData = JSON.parse(fs.readFileSync('./favorites.json', 'utf8'));
  res.render('favorites', {favorites: jsonData.favorites})
});

app.post('/favorites', function(req, res){
  var jsonData = JSON.parse(fs.readFileSync('./favorites.json', 'utf8'));
  console.log(jsonData);
  jsonData.favorites.push(req.body);
  fs.writeFileSync('./favorites.json', JSON.stringify(jsonData));
  res.redirect('/favorites');
});

//Listen
var server = app.listen(process.env.PORT || 3000);

//Exports
module.exports = server;
