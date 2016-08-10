
//requirements

var express = require("express");
var request = require("request");
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var fs = require('fs');

var app = express();

//sample code for below
//var fileContents = fs.readFileSync('./data.json');
//var data = JSON.parse(fileContents);
//fs.writeFileSync('./data.json', JSON.stringify(data));


// set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);

// already included by author ?? causes errors !!!!
//app.use(require('morgan')('dev'));




//requests


//basic get to show index.ejs page
app.get('/', function(req, res) {
  //this doesn't refer to page, so it gets replaced, ref to index
  //res.send("Hello World");
  res.render("index");
});




// app.get('/', function(req, res) {
//   //console.log(process.env.SEARCH_TERM);

//   //res.render('index');

//   var qs = {
//     //s: process.env.SEARCH_TERM, 
//     s: 'darth', 
//     plot: 'short', 
//     r: 'json'

//   }

//   request({
//     url: 'http://omdbapi.com', 
//     qs: qs
//   }, function(error, response, body) {
//     //console.log('into function');
//     var data = JSON.parse(body);
//     res.send(data.Search);
//   });

//   //got the var-qs innards with this 
//   //request('http://omdbapi.com/?t=stuff&y=&plot=short&r=json');

// });



app.get("/results", function(req, res) {

  var qs = {
    s: request.query.search
  };

  request({
    url: "http://www.omdbapi.com", 
    qs: qs
    }, 
    function(error, response, body){
      if (!error && response.statusCode == 200) {
        //yay
        var dataObj = JSON.parse(body);
        //res.send(dataObj.Search);         DID NOT WORK ????
        //res.send(body);
        res.render("results", {results: dataObj.Search});
      }
      else {
        //boo
        res.send("error oh darn");
      }
    });
});




app.post('/favorites', function(req, res) {
  //console.log(req.body);

  var fileContents = fs.readFileSync('./favorites.json', 'utf8');
  var data = JSON.parse(fileContents);
  // //console.log("post is called");
  // data.push(req.body);
  console.log(data);
  data.favorites.push(req.body);
  fs.writeFileSync('./favorites.json', JSON.stringify(data));
  res.redirect('/favorites');
});



app.get('favorites', function(res, req) {
    var fileContents = fs.readFileSync('./favorites.json', 'utf8');
    res.render('favorites', {favorites: data.favorites});
});




app.get('/movie/:imdbId', function(req, res) {
  var qs = {
    i: req.params.imdbID
  };

  request({
    url: "http://www.omdbapi.com", 
    qs: qs
    }, 
    function(error, response, body){
      if (!error && response.statusCode == 200) {
        //yay
        var dataObj = JSON.parse(body);
        //res.send(dataObj.Search);         DID NOT WORK ????
        //res.send(body);
        res.render("show", {movieData: dataObj});
      }
      else {
        //boo
        res.send("error oh darn");
      }
    });
});


//   var fileContents = fs.readFileSync('./data.json');
//   var data = JSON.parse(fileContents);

//   if ((isNaN(req.params.id) || (req.params.id) > data.length - 1)) {
//     console.log("index outside of array");
//   }
//   else
//   {
//       res.render("article", {title: data[req.params.id].title, 
//                               body: data[req.params.id].body})
//   }
  
// });





//listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
