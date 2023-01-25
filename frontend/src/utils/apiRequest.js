export const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        console.log(response);
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
  }