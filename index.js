var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var request = require('request');
var ejsLayouts = require('express-ejs-layouts'); 

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);


app.get('/', function(req, res) {
  // res.send('Hello Backend!');
  res.render('index')
 });

app.get('/', function(req, res) {
  var qs = {//query string
		s: req.query.search
	};

	request({
		url: 'http://www.omdbapi.com',
		qs: qs
	}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var dataObj = JSON.parse(body);
    		res.render('results', {results: dataObj.Search});
  		}
	})
});

app.get('/results/:imdbId', function(req, res){
  var qs = {
  	i: req.params.imdbId,
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      res.render('imdbIds', {results: dataObj})
    }
  })
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
