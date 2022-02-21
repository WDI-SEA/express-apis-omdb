require('dotenv').config()
console.log(process.env.OMDB_API_KEY)
const axios = require('axios')

const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}` // &t=${movieTitle}

axios.get(url)
  .then(response => {
    console.log(response.data)
  })