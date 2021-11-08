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
        res.redirect(`/faves/${createdFave.id}`)
    })
    .catch(error => {
        console.log(error)
        // we can also use console.error
    })
})


// we're going to add a delete, that will allow us to remove a fave
router.delete('/:id', (req, res) => {
    // console.log('this is the id\n', req.params.id)
    db.favorite.destroy({
        where: { id: req.params.id }
    })
    .then(deletedItem => {
        // destroy returns '1' if something was deleted and '0' if nothing happened
        // console.log('you deleted: ', deletedItem)
        res.redirect('/faves')
    })
    .catch(error => {
        console.error
    })
})

// a show route for an individual fave
// if youre using a request parameter (:id in this case) make sure your more specific urls are above the one using the parameter.
router.get('/:id', (req, res) => {
    console.log('this is the fave id\n', req.params.id)
    db.favorite.findOne({
       where: { id: req.params.id } 
    })
    .then(foundFave => {
        res.render('faveDetail', { title: foundFave.title, imdbId: foundFave.imdbId, date: foundFave.createdAt })
    })
    .catch(error => {
        console.error
    })
})

module.exports = router