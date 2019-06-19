const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast');

//console.log(__dirname, __filename);
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); //By default looks for views folder in root directory
app.set('views', viewsPath); //change the default behaviour
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kiran'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Kiran'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Kiran'
    });
});

app.get('/weather', (req, res) => {
    let locationData;

    if (!req.query.address) {
        return res.send({
            error: 'You must send a query param'
        });
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error: error });
        }

        locationData = location;

        forecast(latitude, longitude, (error, message) => {
            if (error) {
                return res.send({ error: error });
            }

            res.send({
                forecast: message,
                location: locationData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kiran',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kiran',
        errorMessage: 'page not found'
    });
});

app.listen(3000, () => {
    console.log('Web server started!');
});