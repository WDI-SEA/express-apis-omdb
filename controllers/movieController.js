
const express = require('express')
const axios = require('axios')
const router = express.Router()

// import and conifg dotenv library
require('dotenv').config() 

//declare the app
const app = express()

router.get('/', (req, res) => {
    res.render('index', { error: req.query.error });
  });


// // GET route for /results
router.get('/results', async (req, res) => {
    try {
        let q = req.query.q;
        let response = await axios.get(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.omdbApiKey}`);
        console.log(response);
        if (response.data.Error) {
        res.redirect(`/?error=${response.data.Error}`);
        } else {
        res.render('results', { searchResults: response.data.Search });
        }
    } catch (error) {
        console.error(error);
    }
});

router.get('/movies/:movie_id', async (req, res) => {
    try {
      let movieId = req.params.movie_id;
      let response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.EXPRESS_APP_API_KEY_OMDB}`);
      res.render('detail', { movieDetails: response.data });
    } catch (error) {
      console.error(error);
    }
  });







//create backend route GET /movies/:movie_id
// router.get('/movies/:movie_id', (req, res) => {
//   axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
//       .then((resFromAPI) =>{
//           console.log(resFromAPI)
//           res.render('/detail.ejs', { resFromAPI })
//       })
//       .catch(err => {console.log(err)})
// })



//open up port for the app to listen on + define port




module.exports = router;
