require("dotenv").config()
const express = require("express")
const ejsLayouts = require("express-ejs-layouts")
const browserSync = require("browser-sync")

const { search, getMovie } = require("./api")

const app = express()
const PORT = process.env.PORT || 3000

const isProduction = "production" === process.eventNames.NODE_ENV

// Don't set etag header in dev (no cache)
app.set("etag", isProduction)
// Remove X-Powered-By header, which identifies Express
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By")
  next()
})

// Sets EJS as the view engine
app.set("view engine", "ejs")
// Specifies the location of the static assets folder
app.use(express.static("static", { etag: isProduction }))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

// Adds some logging to each request
app.use(require("morgan")("dev"))

// Routes
app.get("/", function (req, res) {
  res.render("index")
})

app.get("/results", async function (req, res) {
  const query = req.query.q
  const results = await search(query)
  res.render("results", { results })
})

app.get("/movies/:id", async function (req, res) {
  const result = await getMovie(req.params.id)
  res.render("detail", { result })
})

// The app.listen function returns a server handle
var server = app.listen(PORT, listening)

function listening() {
  console.log(`Demo server available on http://localhost:${PORT}`)
  if (!isProduction) {
    browserSync({
      files: ["static/**/*.{html,js,css}", "views/**/*.ejs"],
      online: false,
      open: false,
      port: PORT + 1,
      proxy: "localhost:" + PORT,
      ui: false,
    })
  }
}

// We can export this server to other servers like this
module.exports = server
