require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const db = require('./models');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');

// const url = `http://www.omdbapi.com/?t=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`

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
app.get('/',(req,res)=>{
  res.render('index.ejs')
})

//
app.get('/results', async (req,res)=>{
  // axios.get(`http://www.omdbapi.com/?s=${req.query.s}&apikey=${process.env.OMDB_API_KEY}`)
  //   .then(response=>{
  //       console.log(response.data.Search)
  //       const searchResults = response.data.Search
  //       // res.send(searchResults)
  //       res.render('results.ejs', {results: searchResults})
        
  //   })
  //   .catch()
    try{
      const response = await axios.get(`http://www.omdbapi.com/?s=${req.query.s}&apikey=${process.env.OMDB_API_KEY}`)
      res.render('results.ejs', {results: response.data.Search})
    }catch(error){
      console.log(error)
    }
})

app.get('/movies',(req,res)=>{
  const url = `http://www.omdbapi.com/?i=${req.query.i}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response=>{
        console.log(response.data)
      
    
        
        res.render('detail.ejs', {results: response.data})

    })
    .catch()
})
//get /faves -- read all faves from database
app.get('/faves',async (req,res)=>{ 
  try {
    const allFaves = await db.fave.findAll()
    res.json(allFaves)
  }catch (error){
    console.log(error)
  }
})
//post /faves == create a fave and redirect to faves
app.post('/faves', async (req,res)=>{
  try {
    await db.fave.create({
      title: req.body.title,
      imdbId: req.body.imdbId

    })
    res.redirect('/faves')
  }catch(error){
    console.log(error)
  }
  
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000,err=>{
  if (err) console.log(err)
  console.log('GOGOGOGOGOGOGOG')
});

// We can export this server to other servers like this
module.exports = server;
