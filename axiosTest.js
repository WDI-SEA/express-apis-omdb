// http://www.omdbapi.com/?i=tt3896198&apikey=bf4cfdd5

const axios = require('axios')

const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=bf4cfdd5'

axios.get(url)
    .then(response => {
        console.log(response.data)
    })
    .catch(console.warn)