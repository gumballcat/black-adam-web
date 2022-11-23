import axios from "axios";

async function executeGet(url, reqMeta) {
  let reqParams = {};
  if (reqMeta && reqMeta.params) {
    reqParams = { ...reqMeta.params };
  }

  let reqHeaders = {};
  if (reqMeta && reqMeta.headers) {
    reqHeaders = { ...reqMeta.headers };
  }

  return new Promise((fulfill, reject) => {
    axios
      .get(url, {
        params: reqParams,
        headers: reqHeaders,
        withCredentials: true,
      })
      .then((response) => {
        fulfill(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function executePost(url, reqMeta) {
  let body = {};
  if (reqMeta && reqMeta.body) {
    body = { ...reqMeta.body };
  }

  let headers = {};
  if (reqMeta && reqMeta.headers) {
    headers = { ...reqMeta.headers };
  }

  return new Promise((fulfill, reject) => {
    axios
      .post(url, body, { headers: headers, withCredentials: true })
      .then((response) => {
        fulfill(response);
      })
      .catch((exception) => {
        reject(exception.response.data.errors[0]);
      });
  });
}

async function executeDelete(url, data) {
  return new Promise((fulfill, reject) => {
    axios
      .delete(url, { params: { ...data } }, { withCredentials: true })
      .then((response) => {
        fulfill(response);
      })
      .catch((exception) => {
        reject(exception.response.data.errors[0]);
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
      .catch((exception) => {
        reject(exception.response.data.errors[0]);
      });
  });
}

const HTTP = { executeGet, executePost, executeDelete, executePostForm };

const HELPER = { HTTP };

export default HELPER;
