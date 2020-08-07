require('dotenv').config();
const  axios = require('axios').default;
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

const omdbApiKey = '22715dd0';

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({extended: false}));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', async function (req, res) {
  res.render("index");
  // try {
  //   const {data} = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=22715dd0');
  //   res.send(data);
  // } catch (error) {
  //   res.send(error);
  // }
});

app.get("/results", (req, res) => {
  console.log("this is the results")
  res.render("results");
})

app.get("/detail", (req, res) => {
  console.log("this is details");
  res.render("detail");
})

// The app.listen function returns a server handle
let server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
