const name = (name, profession='SW Dev') => {
    console.log(name, profession);
};

name('Kiran');


// default params with destructuring
// We are initializing the params to {} so that it doesnt break when we send nothing
const productFunc = (title, {type, cost, power = '250bhp', weight} = {}) => {
    console.log(title, type, cost, power, weight);
};

const prod = {
    title: 'car',
    type: 'luxury',
    cost: '2500000'
};

productFunc('Jeep', prod);
productFunc('Qdaiq');