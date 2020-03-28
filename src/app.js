const path = require('path')
const express = require('express')
const hbs = require('hbs')

const weatherRoutes = require('../routes/weather')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../views/partials'))

app.use('/', weatherRoutes)

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })