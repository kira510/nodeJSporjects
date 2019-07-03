const express = require('express');
require('./db/mongoose');
const Users = require('./model/users');
const Tasks = require('./model/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //if this is not used then req.body is undefined.

app.get('/users', (req, res) => {
    Users.find({})
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    Users.findById(_id).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    }).catch(() => {
        res.status(500).send();
    })
});

app.post('/users', (req, res) => {
    console.log(req.body);
    const user = new Users(req.body);

    user.save().then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/tasks', (req, res) => {
    Tasks.find({}).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Tasks.findById(_id).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/tasks', (req, res) => {
    console.log("BOoooooooooooody", req.body);
    const task = new Tasks(req.body);
    task.save().then((result) => {
        console.log(result);
        res.status(201).send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log('Successfully started app!')
});