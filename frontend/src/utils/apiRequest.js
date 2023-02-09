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


