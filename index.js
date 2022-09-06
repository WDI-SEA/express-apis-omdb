const express = require('express')
const axios = require('axios')
const ejs = require('express-ejs-layouts')
const { response } = require('express')
// const url = `http:www.omdbapi.com/?t=${req.query.userInput}${apiKey}`

const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(ejs)


const API_KEY = process.env.API_KEY

// axios.get('url goes here')
//     .then(function (response) {
//         console.log(response)
//     })

const movies = ('req.query.userInput')
// const imdbID = req.data.Search.imdbID

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/results', (req, res) => {
    const url = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${API_KEY}`
    console.log(req.query.userInput)
    axios.get(url)
        .then(response => {
            console.log(req.query.userInput)
            console.log(response.data)
            res.render('results.ejs', {
                input: req.query.userInput,
                movies: response.data.Search,
                imdbID: response.data.Search.imdbID,
                movie_details: response.data.Search.imdbID
            })
        })
  
})

//second call for details
app.get('/movies/:movie_id', (req,res)=>{
    console.log(req.query)
    const movie_id = req.params.movie_id
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}=${movie_id}`
    console.log(url)
    axios.get(url)
      .then(response =>{
        // console.log(url)
        console.log(response.data)
        res.render('detail.ejs', {
          data: response.data,
          title: response.data.title
        })
  
      })
      .catch(console.warn)
  
  })

// app.get('/detail', (req, res) => {
//     // const url2 = `https://www.imdb.com/title/${movie.imdbID}`
//     const movie_id = response.data.Search.imdbID
//     axios.get(movie_id)
//         .then(res => {
//             console.log(movie_id)
//             res.render('detail', {
//                 input: req.query.userInput,
//                 imdbID: response.data.Search.imdbID
//             })
//         })
        
// })


// app.get('/results', (req, res)=>{
//     console.log(req.query.userInput)
//      const url = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${API_Key}`
//      // axios requests
//  axios.get(url)
//      .then(response =>{
//          console.log(response.data)
//          res.render('results.ejs', {
//           input: req.query.userInput,
//           movies: response.data.Search
//          })
//      })
 
//  })

// app.get('/detail', (req, res) => {
//     res.render('detail.ejs')
// })





app.listen(PORT, () => {
    console.log(`You're tuned into port ${PORT}`)
})


// // Ye example for data with his key
// const url = `http:www.omdbapi.com/?t=${req.query.userInput}${apiKey}`
