const getData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const success = true;

    if (success) {
      resolve("Data received successfully");
    } else {
      reject(new Error("Failed to get data"));
    }
  });
};

getData()
  .then((data) => {
    console.log(data);
  })
  .catch((error: Error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("Request completed");
  });