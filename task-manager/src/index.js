const express = require('express');
require('./db/mongoose');
const usersRouter = require('../src/routers/user');
const tasksRouter = require('../src/routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //if this is not used then req.body is undefined.
app.use(usersRouter);
app.use(tasksRouter);



app.listen(port, () => {
    console.log('Successfully started app!')
});