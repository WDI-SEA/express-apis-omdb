var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

var request = require("request");

app.get("/", function(req, res) {
  res.render('index.ejs');
});

app.get("/result", function(req, res) {
  var id = req.query.q;

  request('http://www.omdbapi.com/?s='+id, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      res.render('result.ejs', {
        result: JSON.parse(body)
      });
    }
  });
});

app.get("/movie/:id", function(req, res) {
  var movieID = req.params.id;

  request('http://www.omdbapi.com/?plot=full&tomatoes=true&i='+movieID, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      res.render("movie.ejs", {
        movie: JSON.parse(body)
      });
    };
  });
});


app.listen(3000);