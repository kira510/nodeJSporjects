const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2]

geocode(location, (error, {latitude, longitude, location}) => {
    if (error) {
        return console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            console.log(error);
            return
        }

        console.log(location);
        console.log(forecastData);
    });
});

