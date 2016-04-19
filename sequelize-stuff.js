var db = require("./models");

Create three favorites
db.favorite.create({title: "Star Wars"}).then(function(data) {
  console.log("****5*****", data)
});
db.favorite.create({title: "Holes"});
db.favorite.create({title: "Wall-E"});


// Add two comments to one
db.favorite.findOne({where: {title: "Star Wars"}}).then(function(fav) {
  fav.createComment({
    text: 'I love Star Wars so much.  It is just awesome.',
    author: 'StarWarsLover88'
  }).then(function(comment) {
    console.log("*****17*****", comment.text)
  })
});

db.comment.create({text: 'I love the movie Holes!', favoriteId: 1});

// Add two tags, one to star wars and walle, and one to holes and walle
db.favorite.findOne({where: {title: "Star Wars"}}).then(function(fav) {
  db.tag.findOrCreate({where: {name: "sci-fi"}}).spread(function(tag, created) {
    fav.addTag(tag);
  })
});

db.favorite.findOne({where: {title: "Wall-E"}}).then(function(fav) {
  db.tag.findOrCreate({where: {name: "sci-fi"}}).spread(function(tag, created) {
    fav.addTag(tag).then(function(tag) {
      console.log("****32****", tag)
    })
  })
});

db.tag.findOrCreate({where: {name: "childrens"}}).spread(function(tag, created) {
  db.favorite.findOne({where: {title: "Wall-E"}}).then(function(fav) {
    if (fav) { tag.addFavorite(fav) }
  })
  db.favorite.findOne({where: {title: "Holes"}}).then(function(fav) {
    if (fav) { tag.addFavorite(fav) }
  })
});

