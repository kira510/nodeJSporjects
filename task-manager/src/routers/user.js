const express = require('express');
const Users = require('../model/users');
const router = new express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) => {
    const user = new Users(req.body);

    console.log(req.body)
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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

module.exports = router;
