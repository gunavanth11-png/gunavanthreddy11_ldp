console.log("====== ES6 CONCEPTS ======\n");


// let

let age = 22;
age = 23;
console.log("let :", age);


// const

const country = "India";
console.log("const :", country);


// Arrow Function

const greet = () => {
    console.log("Hello from Arrow Function");
};

greet();


// Default Parameters

function add(a, b = 10) {
    console.log("Default Parameter :", a + b);
}

add(20);
add(20, 30);


// Template Literals

let name = "Gunavanth";

console.log(`My name is ${name}`);


// Destructuring

const student = {
    sName: "Rahul",
    city: "Hyderabad"
};

const { sName, city } = student;

console.log("Object Destructuring :", sName, city);

const colors = ["Red", "Blue", "Black"];

const [firstColor, secondColor] = colors;

console.log("Array Destructuring :", firstColor, secondColor);


// for...of Loop

const fruits = ["Apple", "Banana", "Mango"];

for (let fruit of fruits) {
    console.log("for...of :", fruit);
}


// Spread Operator

const numbers1 = [1, 2, 3];
const numbers2 = [...numbers1, 4, 5];

console.log("Spread Operator :", numbers2);


// Rest Parameters

function sum(...numbers) {
    console.log("Rest Parameters :", numbers);
}

sum(10, 20, 30, 40);


// Classes

class Employee {
    constructor(name) {
        this.name = name;
    }

    display() {
        console.log("Employee Name :", this.name);
    }
}

const emp = new Employee("Gunavanth");
emp.display();


// Static Method

class Calculator {
    static multiply(a, b) {
        return a * b;
    }
}

console.log("Static Method :", Calculator.multiply(10, 5));


// Getters and Setters

class Person {

    constructor(name) {
        this._name = name;
    }

    get Name() {
        return this._name;
    }

    set Name(value) {
        this._name = value;
    }

}

const person = new Person("John");

console.log("Getter :", person.Name);

person.Name = "David";

console.log("Setter :", person.Name);


// Map

const userMap = new Map();

userMap.set("name", "Gunavanth");
userMap.set("course", "Frontend");

console.log("Map :", userMap.get("name"));

for (let [key, value] of userMap) {
    console.log(key, value);
}


// Set

const setData = new Set();

setData.add("HTML");
setData.add("CSS");
setData.add("JavaScript");
setData.add("HTML");

console.log("Set Values :");

for (let value of setData) {
    console.log(value);
}


// Rest + Spread Example

const marks = [90, 85, 95];

console.log("Maximum Marks :", Math.max(...marks));


console.log("\n====== END OF ES6 CONCEPTS ======");