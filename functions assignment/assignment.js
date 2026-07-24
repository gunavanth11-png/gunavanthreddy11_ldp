// Q1: Passing a function as a parameter to another function

const greet = (name) => `Hello, ${name}`;

const processUser = (name, callback) => {
    return callback(name);
};

console.log(processUser("Gunavanth", greet));


// Q2: Arrow function to return initials

const getInitials = (firstName, lastName) =>
    firstName[0] + lastName[0];

console.log(getInitials("Roger", "Waters"));