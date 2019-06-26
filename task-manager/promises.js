/**
 * Example only for callback vs promises
 */
//CALLBACK to perfrom async operation
/*
You can see below that readability is harder,
Easily we can make error by calling callback twice
error check must be done again in callback
*/
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


//------------------PROMISES---------------
/*
You need not do an error check again, resolve will call then and reject will call no
Below reject will not be called
less prone to error
easier to understand
*/
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