const express = require('express')
const router = express.Router()

const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brandon Samuel'
    })
})

// ROUTE TO MAKE API CALLS TO DARKSKY AND MAPBOX FOR LOCATION AND FORECAST
router.get('/weather', (req, res) => {
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

module.exports = router