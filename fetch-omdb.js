require('dotenv').config()
// console.log(process.env)
const axios = require('axios')

const url = `http://www.omdbapi.com/?s=notebook&apikey=${process.env.OMDB_API_KEY}`

axios.get(url)
.then(response => {
    console.log(response.data)
    
    })
  