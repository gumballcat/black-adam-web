import axios from "axios";

async function executeGet(url, params) {
  return new Promise((fulfill, reject) => {
    axios
      .get(url, { params: { ...params } })
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
