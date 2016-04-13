var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.static(__dirname +'/views'));

app.use( bodyParser.urlencoded({extended: false }) );

app.get("/", function(req, res) {
  res.render("index")
});

app.get('/movies', function(req, res) {
  var query =  req.query.q;
  console.log(query);

  request('http://www.omdbapi.com/?s='+query, function(err, response, body){
    var data =  JSON.parse(body);
    if(!err && response.statusCode === 200 && data.Search) {
      res.render('movies',{movies:data.Search, q:query});
    } else {
      res.render('error');
    }
  });
});


app.get('/movies/:id', function(req, res){
  //var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.id;
  request('http://www.omdbapi.com/?i='+imdbID, function(err,response,body) {
    res.render('movieShow', {movie:JSON.parse(body),
                            q:searchQuery});
  });
});

// app.get('movies')


var port = 3000;
app.listen(port, function() {

});

