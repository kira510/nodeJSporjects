const mongoose = require('mongoose');

const Tasks = mongoose.model('Tasks', {
    title: {
        type: String,
        minlength: 6,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = Tasks;
