const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//router handlers
// req and res are objects

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sid N'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sid N'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Sid N',
        message: 'Some help text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error){
            return res.send({
                error
            })
       }
       forecast(latitude, longitude, (error, forecastData) => {
           if(error){
               return res.send({
                   error
               })
           }
           
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
       })  
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search here'
        })
    }
    
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // express provides * as wildcard character
    res.render('404', {
        title: '404',
        name: 'Sid N',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    // express provides * as wildcard character
    res.render('404', {
        title: '404',
        name: 'Sid N',
        errorMessage: 'Page not found'
    })
}) // this has to come last coz above matches should get false before coming to this

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})