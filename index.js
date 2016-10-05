var express = require('express');
var app = express();
var moviesCtrl = require("./controllers/movie");




var bodyParser = require('body-parser'); // ENABLES US TO READ POST VARIABLES
var fs = require('fs'); // ENABLES US TO READ FROM AND WRITE TO FILES

var request = require('request'); // ENABLES XMLHTTP REQUESTS (LIKE AJAX)




//_____________________________________//
// ANY USE OR GET STATEMENTS
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false})); 
app.set('view engine', 'ejs');
app.use("/movie", moviesCtrl);


// ______________________________________________________  //

app.get("/", function(req, res){
	res.render("index");
});



app.get('/results', function(req, res) {
    var uNeek = {
        s: req.query.uNeek
    };
    request({
        url: "http://www.omdbapi.com",
        qs: uNeek
    },
    function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var movieData = JSON.parse(body);
            // res.send(movieData.Search);
            res.render("./results", { movies: movieData.Search })
        }
        else {
            res.send('An error happened ' + error);
        }
    });
});

app.get('/movies/:imdbId', function(req, res) {
	var qs = {
		i: req.params.imdb
		
	};
	request({
		url: "http://www.omdbapi.com/",
		qs: qs
	},
		function(error, response, body) {
        	if(!error && response.statusCode == 200) {
            	var movieData = JSON.parse(body);
            	// res.send(movieData.Search);
            	res.render("./movies", { movies: movieData.Search })
        	}
        	else {
            	res.send('An error happened ' + error);
        }

    });


});


module.exports = server;


var server = app.listen(process.env.PORT || 3000);