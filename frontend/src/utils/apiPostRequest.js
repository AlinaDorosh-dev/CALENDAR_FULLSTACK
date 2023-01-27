export const apiPostRequest = async (url = "", email, pwd, errMsg = null) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    });
    if (!response.ok) throw Error("Please reload the app");
    return response;
  } catch (err) {
    errMsg = err.message;
  }
};


