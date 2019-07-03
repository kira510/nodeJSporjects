const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email has not valid!');
            }
        }
    },
    age: {
        type: Number,
        validate: (value) => {
            if (value < 0) {
                throw new Error('Age should be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not have passowrd!')
            }
        }
    }
});

module.exports = User;