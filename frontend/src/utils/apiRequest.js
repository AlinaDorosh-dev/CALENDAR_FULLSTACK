import{REGISTER_URL, LOGIN_URL } from '../config';

const apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) {
      // throw Error("Please reload the app");
      return response;
    }
    return response;
  } catch (err) {
    errMsg = err.message;
    return errMsg;
  }
};

export default apiRequest;

export class APIRequest {
  static async register(body) {
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (err) {
      let errMsg = err.message;
      return errMsg;
    }
  }

  static async login(body) {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (err) {
      let errMsg = err.message;
      return errMsg;
    }
  }

  static async updateUser(body, id) {
    try {
      const response = await fetch(`${LOGIN_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (err) {
      let errMsg = err.message;
      return errMsg;
    }
  }

  static async deleteUser(url, id) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      return response;
    } catch (err) {
      let errMsg = err.message;
      return errMsg;
    }
  }

  static async getEventsByUser(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      let errMsg = err.message;
      return errMsg;
    }
  }

  static async deleteEvent(url, id) {
    try {
      const response = await fetch(`${url}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      let errMsg = err.message;
      return errMsg;
    }
  }
}
