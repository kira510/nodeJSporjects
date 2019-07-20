const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

/*
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5d2f78a6ea1e05b282ad48bf')
    await user.populate('tasks').execPopulate()
    //console.log(user.tasks)
}

main()
*/