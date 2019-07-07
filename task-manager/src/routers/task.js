const express = require('express');
const Tasks = require('../model/tasks');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;