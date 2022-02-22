require('dotenv').config()
const axios = require('axios')

    const url = `http://www.omdbapi.com/?i=tt0398165&apikey=${process.env.OMDB_API_KEY}`

    axios.get(url)
      .then(response => {
        console.log(response.data)
      })