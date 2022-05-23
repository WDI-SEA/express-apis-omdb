const axios = require('axios')
require('dotenv').config()
console.log(process.env)
const url = `http://www.omdbapi.com/?i=tt0133093&apikey=${process.env.API_KEY}`


// axios.get(url)
//     .then(response => console.log(response.data))
//     .catch(console.warn)