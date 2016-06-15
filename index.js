var express = require('express');
var ejsLayouts = require('express-ejs-layouts');//lets you layer the code using ejs tags
var request = require('request');
var bodyParser = require('body-parser');
var searchControl = require('./controllers/search');//set up a controller to search.js
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use('/search', searchControl);// when you go to /search, it will route to searchController



app.get('/', function(req, res) {
  res.render('index.ejs');
  // this is saying i want to render the file index.ejs and then send it to the browser
});

app.get('/movie/:id', function(req, res){
// res is a server to the browser. req from browser to server.
  request({
    url: 'http://www.omdbapi.com/',
    qs:{
      i: req.params.id
    }
  }, function(error, response, body){
    // res.send(body)
    var parsed = JSON.parse(body)

    res.render('details.ejs', {movie: parsed})
  })

})


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
