// Object property shorthand

const name = 'Messi';
const userAge = 31;

const user = {
    name,
    age: userAge,
    location: 'Argentina'
}

// ES6 arrow functions
const user2 = {
    name: 'Neymar',
    age: 27,
    location: 'Brazil',
    getAge: () => {
        console.log(this.age); // does not work
    },
    getName () {
        console.log(this.name); // works
    }
}

// user2.getAge(); // undefined
// user2.getName(); // Neymar

//Object destructuring

const {name:playerName , age, location:country, club='PSG', height} = user2;
console.log(playerName, age, country, club, height);