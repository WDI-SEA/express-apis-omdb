const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DB = require('../models');


//details route
//similar to how we refactored the prehistoric creatures and dinos will use a get route to display on the details linking from each movie using imdbID in the query results
//stub it out first
ROUTER.get('/movies/:movie_id', (req, res) => {
  // res.send('something');
  console.log('are we hitting this route??')
  console.log(req.params.movie_id);
  //new axios call for information
  AXIOS.get(`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`)
  .then(response => {
      console.log(response.data.Ratings);
    //res.send(response.data);
    let ratings = response.data.Ratings;
    console.log(ratings[1].Value);
    res.render('detail', {data: response.data});
  });
});

module.exports = ROUTER;