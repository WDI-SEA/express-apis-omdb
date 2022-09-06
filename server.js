require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { response } = require('express');


const myKey = process.env.API_KEY



app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(require('morgan')('dev'));


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/results', (req,res) => {
  
  const url = `https://www.omdbapi.com/?t=${req.query.q}&apikey=${myKey}`
  axios.get(url)
    .then(response => {
      console.log(response.data)
      let dta = response.data
      let infoPacket =  {
        Title: dta.Title,
        Year: dta.Year,
        'Release Date': dta.Released,
    }
      res.render('results', {infoPacket, id : dta.imdbID, img : dta.Poster })
    })
    .catch(console.error)
})

app.get('/movies/:movie_id', (req,res) => {
    const url = `https://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${myKey}`
    axios.get(url)
      .then(response => {
        console.log(response.data)
        let dta = response.data
        res.render('detail', {dta})
      })
      .catch(console.error)
})


let server = app.listen(process.env.PORT || 3000);


module.exports = server;
