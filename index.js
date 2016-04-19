var express = require("express");
var app = express();
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var db = require("./models");
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(ejsLayout);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get("/", function(req,res){
  res.render("index");
});


app.get('/movies', function(req, res){
  var query = req.query.q;
  //check for valid data
  if(query !== '' && query !== undefined) {
  request('http://www.omdbapi.com/?s=' + query , function(err, response, body){
   if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      // console.log(data); //search is the key
      res.render('movies', {results: data.Search});
    }
     
  });
} else {
  throw ("You must enter a valid search");
}
});


app.get('/favorites/:id/comments', function(req,res){
  db.favorites.findOne({where: {
    id: req.params.id,
  }, include: [db.commentt]}).then(function(movie){
    res.render('comments', {
      movie: movie
    })
  })
});

app.post('/comments/:id', function(req,res){
  var newComment = req.body;
  newComment.favoriteId = req.params.id;
  db.commentt.create(newComment).then(function(comment){
   res.redirect('/favorites/'+ req.params.id +'/comments');
  })
})


//add to favorites if not already in there
app.post('/favorites', function(req,res){
  console.log(req.body);
  db.favorites.findOrCreate({where: {
    imdbid: req.body.imdbId,
    title: req.body.title,
    year: req.body.year
  }}).then(function(){
   res.send("success") 
 })
});


//post favorites movies
// app.post('/favorites', function(req,res){
//     db.favorites.create({
//       imdbId: req.body.imdbId,
//       title: req.body.title,
//       year: req.body.year
//     }).then(function(){
//       res.send("success")
//     })
// });


app.get('/favorites', function(req,res){
  db.favorites.findAll({include:[db.tag]}).then(function(movies){ 
    res.render('favorites', {
      movies: movies
    })
  });
});

app.get('/tags', function(req,res){
  db.tag.findAll().then(function(tags){
    res.render('tags', {
      tags: tags
    })
  });
});

app.delete('/favorites/', function(req,res){
  console.log(req.body);
  db.favorites.destroy({where: {id: req.body.favId}}).then(function(){
    res.status(200).send('Deleted Movie');
  })

});



app.get('/favorites/:id/tags', function(req,res){
  res.render('new_tag', {
    fav_id : req.params.id
  })
})

app.post('/tags/:id', function(req,res){
  db.favorites.findOne({where: {
    id: req.params.id
  }}).then(function(movie){
    db.tag.findOrCreate({where:{
      name: req.body.name_tag
    }}).spread(function(tag, created){
      movie.addTag(tag).then(function(){
        res.redirect('/favorites')
      })
    })
  })
})

app.get('/tags/:tag_id', function(req,res){
  db.tag.findById(req.params.tag_id).then(function(tag){
    tag.getFavorites({include: [db.tag]}).then(function(movies){
      res.render('favorites', {
        movies: movies
      })
    })
  })
})





app.get('/movies/:id', function(req,res){
  
  request('http://www.omdbapi.com/?i=' + req.params.id + "&tomatoes=true", function(err, response, body){
    if (!err && response.statusCode == 200) {
     var data = JSON.parse(body);
      console.log(data);
      console.log(req.params.id);
      res.render('eachmovie', {myMovie: data});
    }
  });
});








app.listen(3000);