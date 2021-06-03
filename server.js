// import
const express = require('express')
const axios = require('axios')
require('dotenv').config() 
const layouts = require('express-ejs-layouts')
let methodOverride = require('method-override');
const movieController = require('./controllers/movieController')

//define PORT
const PORT = 3002

//define API key var
const omdbApiKey = process.env.OMDB_API_KEY

//declare the app
const app = express()
app.set('view engine', 'ejs')
app.use(layouts) // use ejs layouts
app.use('/', movieController)
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))//css
app.use(methodOverride('_method'))
app.use(require('morgan')('dev'))

//create a home route
app.get('/', (req, res) => {
  res.render('./index.ejs')
})





//open up port for the app to listen on + define port
app.listen(PORT, () => {
  console.log("welcome to our show ")
})