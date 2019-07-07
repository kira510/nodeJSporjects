/**
 * Example only for callback vs promises
 */
//CALLBACK to perfrom async operation
/*
You can see below that readability is harder,
Easily we can make error by calling callback twice
error check must be done again in callback
*/
/*
const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback('An error', undefined);
        //callback(undefined, {data: 'someData'});
    }, 3000);
};

const callbackFunc = (error, result) => {
    if (error) {
        return console.log(error);
    }

    console.log(result);
}

doWorkCallback(callbackFunc);
*/

//------------------PROMISES---------------
/*
You need not do an error check again, resolve will call then and reject will call no
Below reject will not be called
less prone to error
easier to understand
*/
/*
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hi');
        reject('No');
    }, 3000);
});

doWorkPromise.then((result) => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
*/





//------------------PROMISE CHAINING------------------
/* ----EXAMPLE 1
require('../task-manager/src/db/mongoose');
const Tasks = require('../task-manager/src/model/tasks');

Tasks.findOneAndDelete({_id: "5d14ef94fa294c3cb7331c13"}).then((results) => {
    console.log(results);

    return Tasks.countDocuments({ status: true });
}).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});
*/

/* -----EXAMPLE 2
const sum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 3000);
    });
}

sum(1,2).then((tot) => {
    return sum(tot, 5);
}).then((tot) => {
    console.log(tot);
}).catch((e) => {
    console.log(e);
});
*/


//--------------------------Async-await--------
/*
const sum = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b);
        }, 1000);
    });
}

const totalCount = async () => {
    let tot;

    try {
        tot = await sum(1,2);
        tot = await sum(tot,3);
        tot = await sum(tot,4);
    } catch (e) {
        console.log(e);
    }

    console.log(tot);
}

totalCount();
*/

//-----------ASYNC await
require('../task-manager/src/db/mongoose');
const Tasks = require('../task-manager/src/model/tasks');

const findOneAndDelete = async () => {
    const results = Tasks.findOneAndDelete({_id: "5d14f972dd188a4458d63558"});
    const count = Tasks.countDocuments({ status: true });

    return count;
};

findOneAndDelete().then(count => {
    console.log(count);
}).catch((e) => {
    console.log(e)
});
