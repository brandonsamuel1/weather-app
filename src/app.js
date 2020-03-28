const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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

// ROUTE TO MAKE API CALLS TO DARKSKY AND MAPBOX FOR LOCATION AND FORECAST
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please make sure location is provided!'
        })
    } else {
        const address = req.query.location
        geocode(address, (err, { latitude, longitude, location }) => {
            if (err) {
                return res.send({
                    err
                })
            }
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) {
                    return res.send({
                        err
                    })
                }
                res.send({
                    address,
                    location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })