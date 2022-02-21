const express = require('express')
const router = express.Router()

const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`
  console.log(req.query)
  console.log(url)
  res.render('detail.ejs', req.query)