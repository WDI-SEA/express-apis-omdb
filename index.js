//requires
var express = require("express");
var request = require("request");

var app = express();
app.set('view engine', 'ejs');

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.use(express.static(__dirname + '/views'));

//routes
app.get("/", function(req, res) {
  res.render("index", {});
});

app.get("/movies", function(req, res) {
  var query = req.query.q;
//  var pageNum = req.query.page;

  if(query === '' || query === undefined){
    res.render('index');
    return;
  }

//  if(pageNum === '' || pageNum === undefined){
//    pageNum = 1;
//  }

  request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if(!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search, q: query}); //, page: pageNum, numHits: data.totalResults});
      //res.send(data.Search);
    }
    else{
      res.render('error'); // Need to add a "couln't find" page
    }
  });
});

app.get("/movies/:imdbID", function(req, res) {
  var imdbIDRequested = req.params.imdbID;
  console.log(imdbIDRequested);

  request('http://www.omdbapi.com/?i=' + imdbIDRequested + '&tomatoes=true', function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data.Title);
    if(!err && response.statusCode === 200){
      res.render('show', {showData: data});
      //res.send(data.Title);
    }
    else{
      res.render('error'); // Need to add a "couldn't find" page
    }
  });
});

app.listen(3000);