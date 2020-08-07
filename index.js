require("dotenv").config()

const express = require('express');
const axios = require('axios');
const app = express();

let API_KEY = process.env.API_KEY //using nv to hide API key


app.set("view engine", "ejs")
//using ejs as the view engine for rendering ejs files
app.use(express.static("static"))
// express using static to access CSS

