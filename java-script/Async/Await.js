console.log("====== ASYNC / AWAIT CONCEPTS ======");

// Function returning a Promise
const getData = (message, delay) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(message), delay);
    });


// Async function with await
const userDetails = async () => {
    const user = await getData("User Details Fetched", 1000);
    console.log(user);

    const email = await getData("Email Fetched", 1000);
    console.log(email);
};


// Error Handling
const paymentStatus = async () => {
    try {
        throw new Error("Payment Failed");
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log("Finally Block Executed");
    }
};


// Parallel Execution using Promise.all()
const tasks = async () => {
    const result = await Promise.all([
        getData("Task 1 Completed", 1000),
        getData("Task 2 Completed", 1000),
        getData("Task 3 Completed", 1000),
    ]);

    console.log(result);
};


// Fetch API
const fetchUser = async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    );

    const data = await response.json();
    console.log(data);
};


// Main Function
const main = async () => {
    await userDetails();
    await paymentStatus();
    await tasks();
    await fetchUser();

    console.log("\nAll Async Operations Completed");
};


// Calling the main function
main();