const request = require('request');

// Geocoding api: https://docs.mapbox.com/api/search/#endpoints
const geocode = (address, callback) => {
    const encodedAddress = encodeURI(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoia2lyYW41MTAiLCJhIjoiY2p4MmNndXFkMDI5dzQ5bXNpeTJuMzdsciJ9.8e_NouUYLLDYyYUSH92Xyw`;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the Geocode services.');
        } else if (response.body.features && response.body.features.length === 0) {
            callback('Unable to find location. Try another!');
        } else {
            console.log(response.body);
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;