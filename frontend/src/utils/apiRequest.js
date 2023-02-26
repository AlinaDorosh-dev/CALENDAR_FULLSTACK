import { REGISTER_URL, LOGIN_URL, EVENTS_URL, REFRESH_URL } from "../config";

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

  static async deleteUser(id) {
    try {
      const response = await fetch(`${LOGIN_URL}/${id}`, {
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

  static async getEventsByUser() {
    try {
      const response = await fetch(EVENTS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      if (err.message.includes("Expired token")) {
        const response = await fetch(REFRESH_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("refreshToken"),
          },
        });
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      let errMsg = err.message;
      return errMsg;
    }
  }

  static async postEvent(body) {
    try {
      const response = await fetch(EVENTS_URL, {
        method: "POST",
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

  static async updateEvent(body, id) {
    try {
      const response = await fetch(`${EVENTS_URL}${id}`, {
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

  static async deleteEvent(id) {
    try {
      const response = await fetch(`${EVENTS_URL}${id}`, {
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
