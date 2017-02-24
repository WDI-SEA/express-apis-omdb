//requires and globals
var express = require('express');
var bodyParser =require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

var app = express();


//Set and use statements
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(require('morgan')('dev'));



//routes
app.get('/', function(req, res){
  res.render('search')
});

app.get('/results', function(req, res){
  var qs = {
    s: req.query.movie
  };
  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.render('results', {results: dataObj.Search})
    } else{
      res.send('Oh bananas. Error ' + error);
    }
  });
});

app.get('/movies/:id', function(req, res){
  var qs ={
    i: req.params.id
  };
  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if (!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.render('ids',{results: dataObj});
    } else{
      res.send("Sorry, this movie can not be found.");
    }
  });
});


//listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
