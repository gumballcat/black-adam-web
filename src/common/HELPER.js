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

async function executePostForm(url, formData) {
  return new Promise((fulfill, reject) => {
    axios
      .post(url, formData, { withCredentials: true })
      .then((response) => {
        if (!response.data.error || !response.data.error.errorCode) {
          fulfill(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const HTTP = { executeGet, executePostForm };

const HELPER = { HTTP };

export default HELPER;
