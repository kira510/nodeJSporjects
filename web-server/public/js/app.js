// const proxy = 'https://cors-anywhere.herokuapp.com/';

// fetch(
//     `${proxy}https://api.darksky.net/forecast/6df7baf04c0c22027ad9e3be20471a6a/37,122?units=si`
// ).then(res => {
//     return res.json();
// }).then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err);
// });

const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const message =  document.querySelector('#message');

message.innerText = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    message.innerText = 'Loading...';

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                message.innerText = data.error;
            } else {
                message.innerText = data.forecast;
            }
        }).catch(err => {
            message.innerText = err;
        });
})