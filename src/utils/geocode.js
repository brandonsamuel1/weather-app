require('dotenv').config();
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Something went wrong with the weather service! Try again later...', undefined)
        } else if (body.features.length === 0) {
            callback('No matches found. Please make sure search criteria is correct', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode