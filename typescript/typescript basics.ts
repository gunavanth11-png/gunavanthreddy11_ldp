
// Variables and Basic Types

let name: string = "Gunavanth";
let age: number = 22;
let isStudent: boolean = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Student:", isStudent);

// Type Inference

let city = "Hyderabad";
let marks = 90;

console.log("City:", city);
console.log("Marks:", marks);
// Arrays

let skills: string[] = [
    "HTML",
    "CSS",
    "JavaScript"
];

let numbers: number[] = [
    10,
    20,
    30
];

console.log("Skills:", skills);
console.log("Numbers:", numbers);
// Tuple

let user: [string, number] = [
    "Reddy",
    22
];

console.log("User:", user);
// Object

let product: {
    name: string;
    price: number;
} = {

    name: "Laptop",
    price: 50000

};

console.log("Product:", product);
// Arrow Function

const multiply =
(num1:number, num2:number):number =>
num1 * num2;


console.log(
    "Multiplication:",
    multiply(5,5)
);
// Optional Parameter

function greet(name?:string):void {

    console.log(
        "Hello",
        name
    );

}

greet("Gunavanth");
// Union Type

let id: string | number;

id = "TS101";

console.log(id);

id = 101;

console.log(id);
// Interface

interface Student {

    name:string;
    age:number;

}


let student:Student = {

    name:"Ravi",
    age:20

};


console.log(student);
// Class

class Person {

    name:string;


    constructor(name:string){

        this.name = name;

    }


    display():void{

        console.log(
            this.name
        );

    }

}


let person =
new Person("Ram");


person.display();
// Any Type

let data:any = "Hello";

data = 100;

console.log(data);
// Void Function

function message():void {

    console.log(
        "Learning TypeScript"
    );

}

message();
// End

console.log(
    "Basic TypeScript Completed"
);