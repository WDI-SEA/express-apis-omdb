var express = require("express");
var app = express();
var ejsLayout = require("express-ejs-layouts");
var request = require('request');

app.set('view engine', 'ejs');
app.use(ejsLayout);

app.get("/", function(req,res){
  res.render("index");
})


app.get('/movies', function(req, res){
  var query = req.query.q;
  //check for valid data
  if(query !== '' && query !== undefined) {
  request('http://www.omdbapi.com/?s=' + query , function(err, response, body){
   if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data); //search is the key
      res.render('movies', {results: data.Search});
    }
     
  });
} else {
  throw ("You must enter a valid search");
}
});


app.get('/movies/:id', function(req,res){
  
  request('http://www.omdbapi.com/?i=' + req.params.id + "&tomatoes=true", function(err, response, body){
    if (!err && response.statusCode == 200) {
     var data = JSON.parse(body);
      console.log(data);
      res.render('eachmovie', {myMovie: data});
    }
  });
});

app.listen(3000);