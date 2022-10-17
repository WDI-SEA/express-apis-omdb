const { render } = require('ejs')
const express = require('express')

const router = express.Router()


const fs = require('fs')


// main route
router.get('/', (req, res) => {
  console.log(process.env.RANDOM_ENV_VAR)
  // res.send('Hello, backend!');
  res.render('index.ejs');
});



// when user makes a post request
router.get('/results', (req, res) => {
    let query = req.query
    
    let title = req.query.t
    let year = req.query.y
    let plot = req.query.plot
    

    res.render('results.ejs');
  });


module.exports = router