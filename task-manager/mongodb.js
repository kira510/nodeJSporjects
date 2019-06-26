// CRUD operations

const { MongoClient, ObjectID} = require('mongodb');

//even if you dont give new, mongodb adds it. Mongodb is defensively programmed
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

//using localhost creates some issues and slows down also so use IP directly
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB.');
    }

    console.log('Successfully connected!');

    const db = client.db(databaseName);
    const taskCollection = db.collection('tasks');

    taskCollection.findOne({ _id: new ObjectID("5d12e711633c9b5cca780d1b") }, (error, result) => {
        if (error) {
            return console.log('Unable to perform find operation.')
        }
        console.log(result);
    });

    taskCollection.updateOne(
        { _id: new ObjectID("5d12e711633c9b5cca780d1b") },
        {
            $set: {
                status: true
            }
        }
    ).then((result) => {
        console.log(result);
    }).catch((error)=> {
        console.log('Update operation failed!');
    });

    // taskCollection.find({ status: false }).toArray((err, result) => {
    //     if (err) {
    //         return console.log('Unable to perform find operation.');
    //     }

    //     console.log(result);
    // });

    // taskCollection.insertOne({
    //     _id: id,
    //     description: 'Submit code challenge',
    //     status: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Cannot insert data.');
    //     }

    //     console.log(result.ops);
    // });

    // taskCollection.insertMany([
    //     {description: 'Finish nodejs course', status: false},
    //     {description: 'Learn JS in depth', status: false}
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Cannot insert data.');
    //     }

    //     console.log(result.ops);
    // });
});
