require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios =  require("axios")
const app = express();

const omdbAPIKey= process.env.OMDB_API_KEY

const PORT = 5000

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static(__dirname + '/public'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);


// Routes
app.get("/", function(req, res) {
  res.render("index.ejs");
});



app.get("/results", (req ,res) => {
  let query = req.query.title
  console.log(query)

  axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${omdbAPIKey}`)
  .then((resFromAPI) => {
      const movieTitles = resFromAPI.data.Search
      JSON.stringify(movieTitles)
      
      res.render("./results.ejs", {movieTitles})
      
  })
  .catch(err => {
      console.log(err)
  })

})


app.get("/movies/:movie_id", (req,res) => {
  axios.get(`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${omdbAPIKey}`)
  .then((responseID) => {
    const details= responseID.data
    console.log(responseID.data.Plot);


    res.render("./detail.ejs", {details})
  })
  .catch(err => {
    console.log(err)
})


})



app.listen(PORT, () => {
  console.log("Welcome to our basic movie app")
})


