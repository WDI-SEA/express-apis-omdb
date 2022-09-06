require('dotenv').config();
const express = require('express')
const axios = require('axios')
// const MY_KEY = "b4ede9e0"
const app = express()
const PORT = 8000
app.set('view engine', 'ejs')

app.get('/', (req, res)=> {
    res.render('index.ejs')

})

app.get('/results', (req, res) => {
    console.log(req.query ,"this is req.query")
    const url = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.MY_KEY}`
    axios.get(url).then(response => {
            console.log(response.data, "this is res.data")
            res.render('results.ejs', {
                input: req.query.userInput,
                movie: response.data
            })
        })
        .catch(console.error)
})
app.get('/movies/:movie_id', (req, res) =>
{
	const url = `https://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.MY_KEY}`;
	axios.get(url).then(response =>{
        console.log(response.data, "this is res.data")
		res.render("detail.ejs", {movie: response.data});
	}).catch(console.warn);
})

app.listen(PORT, () => {
    console.log(`Got this port ${PORT} working baby`)
})
