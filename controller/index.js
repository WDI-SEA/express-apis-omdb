const express = require("express");
const app = express();

app.set("view engine", "ejs");


app.get("/", (req, res) => {
  console.log("this is the index");
  res.render("views/index");
})

app.get("/results", (req, res) => {
  console.log("this is the results")
  res.render("views/results");
})

app.get("/detail", (req, res) => {
  console.log("this is details");
  res.render("views/detail");
})