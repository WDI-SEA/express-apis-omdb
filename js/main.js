// Prepare document and grab text from input box
$(document).ready(() => {
    $(`#searchForm`).on(`submit`, (e) => {
        let searchText = $(`#searchText`).val()
        getMovies(searchText)
        e.preventDefault()
    })

    // Define Express and Axios
    const express = require('express')
    const axios = require('axios')

    // Define Port and App
    const app = express()
    const PORT = 8000

    // Function to get search text
    function getMovies(searchText) {
        axios.get('http://omdbapi.com?s=' + searchText)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }        
})    