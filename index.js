var express = require("express");
var app = express();
var request = require("request");

app.set("view engine" ,"ejs");

app.use(express.static(__dirname + '/static'));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);


app.get("/", function(req, res){
	res.render("index.ejs");
});


app.get("/movies/:idx", function(req, res){

	var moviesIdx = req.params.idx;
	request("http://omdbapi.com/?i="+moviesIdx,function(error, response, data){
		if(!error && response.statusCode == 200){
			var movieInfo = JSON.parse(data);
			res.render("moviesShow.ejs",{movies: movieInfo});
		}else{

		};
	});	
});

app.get("/movies", function(req, res){
	var title = req.query.title
	var qs = {
		s: title,
	};

	request({

		url: "http://omdbapi.com/?",
		qs: qs
		}, function(error, response, data ){
			if(!error && response.statusCode == 200){
				console.log(data)
				var dataObject = JSON.parse(data);
				if(dataObject.Error){
					//error
					res.send("ERROR!")
				}
				res.render("movies", {movies: dataObject.Search});
			}else{
				//error
				res.send("ERROR!")
			};
		});
	
});



app.listen(3000);