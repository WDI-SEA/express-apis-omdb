require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

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
// app.get('/', function(req, res) {
//   console.log(process.env.RANDOM_ENV_VAR)
//   // res.send('Hello, backend!');
//   res.render('index.ejs');
// });

// Route with controller
app.use('/', require('./controllers/main.js'))

// The app.listen function returns a server handle
let server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
