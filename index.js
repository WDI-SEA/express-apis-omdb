const express = require("express")
const app = express()
const axios = require("axios")
const ejsLayouts = require('express-ejs-layouts');

const PORT = 8000

app.set("view engine","ejs")
app.use(ejsLayouts);

console.log(process.env.API_KEY)

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/search",(req,res)=>{

const url = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}` 
axios.get(url)
.then(receivedData=>{
    console.log(receivedData.data.Search.length)
    res.render("results.ejs",{
        searched:req.query.userInput,
        movieResult:receivedData.data.Search})
})
.catch(err=>{
    console.log(err)
})

})
app.get("/detail/:movie_id",(req,res)=>{

    
    const url = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}` 
    axios.get(url)
    .then(receivedData=>{
        res.render("detail.ejs",{
            movieResult:receivedData.data})
    })
    .catch(err=>{
        console.log(err)
    })
 })

app.listen(PORT,()=>{
    console.log(`PORT ${PORT} is de-port-ting 🙅🏽‍♂️`)
})