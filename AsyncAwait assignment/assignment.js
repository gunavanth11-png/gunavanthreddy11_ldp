const getData = (uId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Fetched the data!");
            resolve("gmail@gmail.com");
        }, 4000);
    });
};

const displayEmail = async () => {
    console.log("start");

    const email = await getData("gmail");

    console.log(`Email id of the user id is: ${email}`);
    console.log("end");
};

displayEmail();