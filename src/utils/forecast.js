const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/14a12423268274ec61d81638d84df767/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request( {url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast