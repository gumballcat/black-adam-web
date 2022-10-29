import axios from "axios";

async function executeGet(url) {
  return new Promise((fulfill, reject) => {
    axios
      .get(url)
      .then((response) => {
        fulfill(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

const HTTP = { executeGet };

const HELPER = { HTTP };

export default HELPER;
