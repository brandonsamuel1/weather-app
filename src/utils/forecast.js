require('dotenv').config();
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}?units=si`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Something went wrong with the weather service! Try again later...', undefined)
        } else if (body.err) {
            callback('Please make sure search criteria is correct', undefined)
        } else {
            const summary = body.daily.data[0].summary
            const temp = Math.ceil(body.currently.temperature)
            callback(undefined, `${summary} It is currently ${temp} degrees out...`)
        }
    })
}

module.exports = forecast