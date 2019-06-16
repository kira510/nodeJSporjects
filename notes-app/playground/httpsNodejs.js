const https = require('https');

const req = https.request('https://api.darksky.net/forecast/6df7baf04c0c22027ad9e3be20471a6a/37,122?units=si', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

req.on('error', (e) => {
    console.log(e);
});
req.end();