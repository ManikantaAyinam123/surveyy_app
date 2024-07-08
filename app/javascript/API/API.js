import axios from "axios";
import { STATUS_CODE, BASE_URL } from "./Constants";
import { toast } from "react-toastify";

// Request Methods
const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

/*
* API controller for handling the request
*/
class API {
  isLoggedIn = false;
  userData = {};
  userToken = null;

  constructor() {
    this.baseURL = BASE_URL;
  }

  get(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.GET, url, data)
        .then((response) => resolve(response))
        .catch((error) => {
          console.error("GET request error:", error);
          reject(error);
        });
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.POST, url, data)
        .then((response) => resolve(response))
        .catch((error) => {
          console.error("POST request error:", error);
          reject(error);
        });
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.PUT, url, data)
        .then((response) => resolve(response))
        .catch((error) => {
          console.error("PUT request error:", error);
          reject(error);
        });
    });
  }

  delete(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.DELETE, url, data)
        .then((response) => resolve(response))
        .catch((error) => {
          console.error("DELETE request error:", error);
          reject(error);
        });
    });
  }

  // Main function to hold the axios request params
  api(method, url, data) {
    return new Promise((resolve, reject) => {
      let axiosConfig = {
        method: method,
        url: this.baseURL + url,
        headers: this.setHeaders(data),
      };

      if (data) {
        axiosConfig.data = data;
      }

      axios(axiosConfig)
        .then((response) => {
          if (response && response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            toast.error("Something went wrong!!");
          } else {
            resolve(response);
            // Uncomment if you want to show a success toast
            // if (response) {
            //   toast.success(response.data?.messages);
            // }
          }
        })
        .catch((error) => {
          let err = error?.response;
          let errData = error?.response?.data;
          console.error("ERROR", error);

          // Handle specific errors based on status or error messages
          if (err?.status === 401) {
            toast.error(`${errData.errors}`);
          } else if (err?.status === 422) {
            console.log(`${error.response.data.errors}`);
          } else {
            console.log("An error occurred");
          }

          reject(error);  // Ensure the error is propagated
        });
    });
  }

  // Set the headers for request
  setHeaders(data) {
    let headers = {
      "accept-language": "en",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    };

    if (data) {
      if (data.isMultipart) {
        headers["Content-Type"] = "multipart/form-data";
      }
      if (data.headers) {
        Object.assign(headers, data.headers);
      }
    }

    return headers;
  }
}

export default API;
