console.log("====== PROMISES CONCEPTS ======");

const userPromise = new Promise((resolve, reject) => { // Creating a Promise using resolve(
    let isLoggedIn = true;

    setTimeout(() => {
        if (isLoggedIn) {
            resolve("User Logged In Successfully");
        } else {
            reject("Login Failed");
        }
    }, 1000);
});

userPromise
    .then((message) => {                    // Consuming a Promise
        console.log("then():", message);
        return "Fetching User Profile...";
    })
    .then((profile) => {
        console.log("Promise Chaining:", profile);
    })
    .catch((error) => {
        console.log("catch():", error);
    })
    .finally(() => {
        console.log("finally(): Promise Execution Completed");
    });

Promise.resolve("Promise.resolve() Executed Successfully")   // Promise.resolve()
    .then((result) => {
        console.log(result);
    });

Promise.reject("Promise.reject() Executed") // Promise.reject()

    .catch((error) => {
        console.log(error);
    });

const p1 = new Promise((resolve) => {           // Promise.all()
    setTimeout(() => resolve("Task 1 Completed"), 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => resolve("Task 2 Completed"), 3000);
});

const p3 = new Promise((resolve) => {
    setTimeout(() => resolve("Task 3 Completed"), 1000);
});

Promise.all([p1, p2, p3])
    .then((result) => {
        console.log("Promise.all():", result);
    });


// Promise.allSettled()

const p4 = Promise.resolve("Success");   
const p5 = Promise.reject("Failed");
const p6 = Promise.resolve("Completed");

Promise.allSettled([p4, p5, p6])
    .then((result) => {
        console.log("Promise.allSettled():");
        console.log(result);
    });

const race1 = new Promise((resolve) => {            // Promise.race()
    setTimeout(() => resolve("Race Winner - Promise 1"), 1000);
});

const race2 = new Promise((resolve) => {
    setTimeout(() => resolve("Race Winner - Promise 2"), 3000);
});

Promise.race([race1, race2])
    .then((result) => {
        console.log("Promise.race():", result);
    });


// Promise.any()

const any1 = Promise.reject("Failed");          
const any2 = new Promise((resolve) => {
    setTimeout(() => resolve("First Successful Promise"), 2000);
});
const any3 = Promise.resolve("Another Success");

Promise.any([any1, any2, any3])
    .then((result) => {
        console.log("Promise.any():", result);
    });

const paymentPromise = new Promise((resolve, reject) => {       // Error Handling Example
    let paymentSuccessful = false;

    if (paymentSuccessful) {
        resolve("Payment Successful");
    } else {
        reject("Payment Failed");
    }
});

paymentPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log("Error Handling:", error);
    });

// Error Handling Example
console.log("\n====== CALLBACK HELL EXAMPLE ======"); 
function getUser(callback) {
    setTimeout(() => {
        console.log("User Data Fetched");

        callback();
    }, 1000);
}

function getOrders(callback) {
    setTimeout(() => {
        console.log("Orders Fetched");

        callback();
    }, 1000);
}

function getPayment() {
    setTimeout(() => {
        console.log("Payment Details Fetched");
    }, 1000);
}

getUser(() => {
    getOrders(() => {
        getPayment();
    });
});


console.log("\n====== END OF PROMISES CONCEPTS ======");