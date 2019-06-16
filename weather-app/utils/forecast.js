const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6df7baf04c0c22027ad9e3be20471a6a/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather URL service');
        } else if (body.error) {
            callback('Unaable to get weather for the specified location. Try Another!');
        } else {
            const message = body.daily.data[0].summary + ' The temperature is ' + body.currently.temperature +
                ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain';
            callback(undefined, message);
        }
    });
};

module.exports = forecast;


//https://api.darksky.net/forecast/6df7baf04c0c22027ad9e3be20471a6a/37.8267,-122.4233?units=si
// https://darksky.net/dev