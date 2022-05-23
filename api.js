require("dotenv").config()
const axios = require("axios")

const API_KEY = process.env.API_KEY
const baseUrl = `http://www.omdbapi.com/?apikey=${API_KEY}`

const search = async (query) => {
  const url = `${baseUrl}&s=${query}`

  const response = await axios.get(url)
  return response.data.Search
}

const getMovie = async (id) => {
  const url = `${baseUrl}&i=${id}`
  const response = await axios.get(url)
  return response.data
}

module.exports = {
  search,
  getMovie,
}
