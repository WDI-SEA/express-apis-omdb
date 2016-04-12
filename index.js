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

// app.get('/moviesjson', function(req, res) {
//   var query =  req.query.q;
//   console.log(query);

//   request('http://www.omdbapi.com/?s='+query, function(err, response, body){
//     var data =  JSON.parse(body);
//     if(!err && response.statusCode === 200 && data.Search) {
//       res.send(data);
//     } else {
//       res.render('error');
//     }
//   });
// });

app.get('/movies/:imdbID', function(req, res){
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params/imdbID;
  request('http://www.omdbapi.com/?i='+imdbID, function(err,response,body) {
    res.render('movieShow', {movie:JSON.parse(body),
                            q:searchQuery});
  });
});



var port = 3000;
app.listen(port, function() {

});

// var express = require('express');
// var request = require('request');
// var app = express();

// app.get('/', function(req, res) {
//   var qs = {
//     s: 'star wars'
//   };

//   request({
//     url: 'http://www.omdbapi.com',
//     qs: qs
//   }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var dataObj = JSON.parse(body);
//       res.render("index");
//     }
//   });
// });


// //
// var url = require("url");
// app.get("/articles", function(req, res) {
//   var url_parts = url.parse(req.url, true);
//   var query = url_parts.query;
//   var searchTerm = query.q;
//   if (!searchTerm) {
//     res.render("articles", {articles: articles});
//   } else {
//     var results = [];
//     articles.forEach(function(article) {
//         var isTitleMatch = article.title.indexOf(searchTerm) != -1;
//         var isContentMatch = article.content.indexOf(searchTerm) != -1;
//         if (isTitleMatch || isContentMatch) {
//           results.push(article);
//         }
//     });
//     res.render("articles", {articles: results});
//   }
// });

// app.listen(3000);
