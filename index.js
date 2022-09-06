const express = require('express');
const app = express();
const axios = require('axios');
const port = 3001;
const myKey = process.env.API_KEY;
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/results', (req, res) => {
    const url = `http://www.omdbapi.com/?apikey=${myKey}&s=${req.query.s}`
    axios.get(url)
    .then(resposne => {
        // console.log(resposne.data)
        res.render('results', {
            input: req.query.s,
            movies: resposne.data.Search
        })
    })
    .catch(console.warn)
})
app.get('/movies/:movie_id', (req, res) => {
    const url = `http://www.omdbapi.com/?apikey=${myKey}&i=${req.params.movie_id}`
    axios.get(url)
    .then(resposne => {
        console.log(resposne.data)
        res.render('detail', {
            movies: resposne.data
        })
    })
    .catch(console.warn)
})


app.listen(port, () => {
    console.log(`Connected to ${port}!`);
})