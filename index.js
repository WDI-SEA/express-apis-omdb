var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
var db = require("./models");

app.set("view engine" ,"ejs");

app.use(express.static(__dirname + '/static'));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);


app.get("/", function(req, res){
	res.render("index.ejs");
});

app.get("/favorites",function(req,res){
	db.favorite.findAll().then(function(favorite){
		res.render("favorites.ejs", {favorite:favorite});
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


app.post("/favorites/:imdbID", function(req, res){
	console.log(req.body);
	var id = req.params.imdbID;
	
	db.favorite.create({
		imdbId: id, 
		title: req.body.Title,
		year: req.body.Year 
	}).then(function(){
		res.redirect("../favorites");
		// res.render("favorites.ejs", {favorite:data});
		// console.log(data);
	});	
	// res.redirect("/favorites")
});

app.get("/favorites/:imdbId/comments",function(req,res){
	var id = req.params.imdbId;
	db.favorite.find({
		where : {
			imdbId : id
		}, include : [db.comment]
	}).then(function(favorite){
		// res.send(favorite);
		res.render("comments",{favorite:favorite});
	});
});

app.post("/favorites/:id/comments", function( req, res){

	var id = req.params.id;
	console.log("*****id: ", id);
		// res.send(id);
	db.favorite.find({
		where : {
			id : id
		}
	}).then(function(favorite){
		console.log("*****here");
		favorite.createComment({
			content : req.body.content,
			author : req.body.author
		}).then(function(comments){
			console.log("it works");
			res.redirect("/favorites/:imdbId/comments");
			// res.render("comments", {comments});
			console.log(comment);

		});
	});
});

app.get("/favorites/tags",function(req, res){
	db.tag.findAll().then(function(tags){
		res.render("tag.ejs", {tags:tags});
	});
});

app.post("/favorites/:id/tags", function(req,res){
	var id = req.params.id;
	console.log(id);
	db.favorite.find({
		where : {
			id : id
		}
	}).then(function(movie){
		db.tag.findOrCreate({
		where : {
			tag : req.body.tag,
		}
	}).spread(function(tag, created){
		db.favoritesTags.findOrCreate({
			where: {
				tagId : tag.id,
				favoriteId : movie.id
			}
		})
		res.redirect("/favorites")

	});
});
});

// app.get("/tags",function(res,res){
// 	res.send("I work too too too");
// });

// app.get("/tag", function(req,res){
// 	res.send(" I work too too tooo toooo")
// });








app.listen(3000);