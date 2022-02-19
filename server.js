require('dotenv').config();
const Router= require('express');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')

// Sets EJS as the view engine
app.set('view engine', 'ejs');

// Specifies the location of the static assets folder
app.use(express.static('static'));

// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));

// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
//  const objTest = [{Test: 'test1', Value: 'value1'},{Test: 'test2', Value: 'value2'}]
 const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.search}`
 axios.get(url)
 .then(response => {
    res.render('index',{searchResults : response.data.Search})
 })
 
});

app.get('/detail', (req,res)=> {
  let queryString = req.query.i
  const urlDetails = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${queryString}`
  axios.get(urlDetails)
   .then(r =>{
    console.log(r.data)
    res.render('detail.ejs', {
      Title: r.data.Title,
      Year: r.data.Year,
      Rated: r.data.Rated,
      Released: r.data.Released,
      Runtime: r.data.Runtime,
      Genre: r.data.Genre,
      Director: r.data.Director,
      Writer: r.data.Writer,
      Actors: r.data.Actors,
      Plot: r.data.Plot,
      Language: r.data.Language,
      Country: r.data.Country,
      Awards: r.data.Awards,
      Poster: r.data.Poster,
      Ratings: r.data.Ratings,
      Metascore: r.data.Metascore,
      imdbRating: r.data.imdbRating,
      imdbVotes: r.data.imdbVotes,
      imdbID: r.data.imdbID,
      Type: r.data.Type,
      DVD: r.data.DVD,
      BoxOffice: r.data.BoxOffice,
      Production: r.data.Production,
      Website: r.data.Website,
      Response: r.data.Response
    })  

  })
  // .catch(err)  
})

// The app.listen function returns a server handle
app.listen(process.env.PORT,err =>{
  if(err) console.log(err)
  console.log(`Server listening to port ${process.env.PORT} 🎧`)
});

// We can export this server to other servers like this
module.exports = Router
