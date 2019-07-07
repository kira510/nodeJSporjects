/**
 * Playing with basics here
 */

const mongoose = require('mongoose');
//const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((res) => {
    //console.log('res is', res);
    console.log('Successful DB connection!');
}).catch((err) => {
    console.log(err);
});

// const User = mongoose.model('User', {
//     name: String,
//     email: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email has not valid!');
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate: (value) => {
//             if (value < 0) {
//                 throw new Error('Age should be a positive number');
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password must not have passowrd!')
//             }
//         }
//     }
// });

// const user = new User({ name: 'Kiran', email: 'k@g.com', age: 26, password: 'pass123' });
// user.save().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err);
// });

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     status: {
//         type: Boolean
//     }
// });

// const task1 = new Task({ description: 'Finish nodejs course', status: false });
// task1.save().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err);
// });