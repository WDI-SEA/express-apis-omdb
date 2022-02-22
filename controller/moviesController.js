const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/:id', (req, res) => {
	let imdbID = req.params.id;
	const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`;
	axios.get(url).then((response) => {
		const searchResults = response.data;
		res.render('detail.ejs', { results: searchResults });
	});
});

module.exports = router;
