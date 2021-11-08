const express = require('express')
const router = express.Router()
const db = require('../models')


// we need an index route that will show all faves
router.get('/', (req, res) => {
    db.favorite.findAll()
        .then(faves => {
            res.render('indexFaves', { results: faves })
        })
        .catch(error => {
            console.error
        })
})


// we need a post route that will save a fave
// the url endpoint we'll be using for creating a fave will be this:
// '/faves/addFave'
router.post('/addFave', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('this is data', data)
    db.favorite.create({
        title: data.title,
        imdbId: data.imdbId
    })
    .then(createdFave => {
        console.log('db instance created: \n', createdFave)
    })
    .catch(error => {
        console.log(error)
        // we can also use console.error
    })
    .finally(res.send('added to favorites! congrats!'))
})


// we're going to add a delete, that will allow us to remove a fave

// time permitting, a show route for an individual fave

module.exports = router