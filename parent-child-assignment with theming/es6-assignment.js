console.log("== Gunavanth Solutions ==");

// Question 1

const printName = (name) => `Hi ${name}`;

console.log(printName("Gunavanth"));


// Question 2

const printBill = (name, bill) => `Hi ${name}, please pay: ${bill}`;

console.log(printBill("Gunavanth", 500));


// Question 3

const person = {
    name: "Noam Chomsky",
    age: 92
};

const { name, age } = person;

console.log(`Name: ${name}`);
console.log(`Age: ${age}`);

console.log("== End Program ==");