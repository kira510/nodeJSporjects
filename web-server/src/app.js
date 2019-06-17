const express = require('express');
const path = require('path');

//console.log(__dirname, __filename);
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'FROM HBS'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Still hot',
        location: 'Bengaluru'
    });
});

app.listen(3000, () => {
    console.log('Web server started!');
});