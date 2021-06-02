//Import Express
const express = require('express')
//Import axios
const axios = require('axios')
//Import AND config dotenv library
require('dotenv').config()
//PORT
const PORT = 3000
//Declare the app
const app = express()
//Import ejsLayouts
const ejsLayouts = require('express-ejs-layouts')
//Define API key var retreived from .env file
const omdbApiKey = process.env.OMDB_API_KEY

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

//Not sure if I need since we didn't use in class
// Adds some logging to each request
// app.use(require('morgan')('dev'));

// Routes

//Create home route
app.get('/', (req, res) => {
  //ORIGINAL REQUEST for information
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
  //RESPONSE FROM API (ACCESS to informaiton)
      .then((resFromAPI) => {
          console.log(resFromAPI.data.Title)
          res.send(resFromAPI.data.Title)
      })
      .catch(err => {console.log(err)})
})

//open up a port for app to listen
app.listen(PORT, () => {
  console.log(`Working PORT: ${PORT}`)
})

// We can export this server to other servers like this
// module.exports = server;
