const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../views/partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brandon Samuel'
    })
})

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })