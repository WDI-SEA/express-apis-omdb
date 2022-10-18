require('dotenv').config();
const express = require('express'),
    ejsLayouts = require('express-ejs-layouts'),
    app = express(),
    port = process.env.PORT || 3000,
    axios = require('axios')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'));
app.use('/', require('./controllers/main'))


app.listen(port);