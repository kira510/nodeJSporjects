const express = require('express');
require('./db/mongoose');
const Users = require('./model/users');
const Tasks = require('./model/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //if this is not used then req.body is undefined.

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await Users.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/users', async (req, res) => {
    const user = new Users(req.body);

    console.log(req.body)
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowed = ['name', 'age', 'email', 'password'];
    const isVlaid = updates.every(update => allowed.includes(update));

    if (!isVlaid) {
        return res.status(400).send({ message: 'Field not present to update!'});
    }

    try {
        const user = await Users.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found!'});
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }

});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete({ _id: req.params.id});

        if (!user) {
            return res.status(404).send({ message: "User not found!"});
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Tasks.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowed = ['title', 'description', 'status'];
    const isVlaid = updates.every(update => allowed.includes(update));

    if (!isVlaid) {
        return res.status(400).send({message: 'Cant update provided field!'})
    }

    try {
        const task = await Tasks.findByIdAndUpdate({ _id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).send({ message: "Task not found!"});
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete({ _id: req.params.id});

        if (!task) {
            return res.status(404).send({ message: "Task not found!"});
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log('Successfully started app!')
});