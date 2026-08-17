const getData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
};

const fetchData = async (): Promise<void> => {
  try {
    const data = await getData();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();