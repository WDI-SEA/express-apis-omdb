require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride =require('method-override');

//app set up
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// // Enables EJS Layouts middleware
app.use(ejsLayouts);
//bodyparingmiddleware
app.use(methodOverride('_method'));

// // Adds some logging to each request
// app.use(require('morgan')('dev'));

// Default Routes
app.get('/', function(req, res) {
  res.render('index');
});

//Controller
app.use('/', require('./routes/movies'));

//error 404

app.get('/*', (req, res) =>{
  res.send("This is not the page you're looking for...");
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
