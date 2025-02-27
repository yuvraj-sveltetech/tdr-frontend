const LOCAL_IP = "10.10.99.113";

const getRedirectUrl = () => {
  if (typeof window !== "undefined") {
    const isLocalNetwork = window.location.hostname === LOCAL_IP;
    return isLocalNetwork
      ? process.env.REACT_APP_REDIRECT_URL
      : process.env.REACT_APP_VPN_REDIRECT_URL;
  }

  return process.env.REACT_APP_REDIRECT_URL;
};

export const URL = getRedirectUrl();

export const getBaseUrl = () => {

  if (typeof window !== "undefined") {
    const isLocalNetwork = window.location.hostname === LOCAL_IP;
    return isLocalNetwork
      ? process.env.REACT_APP_API_KEY
      : process.env.REACT_APP_VPN_API_KEY;
  }
  return process.env.REACT_APP_API_KEY;
};

export const BASE_URL = getBaseUrl();


export const getCreateFolder = () => {
  if (typeof window !== "undefined") {
    const isLocalNetwork = window.location.hostname === LOCAL_IP;
    return isLocalNetwork
      ? process.env.REACT_APP_API_KEY_CREATE_FOLDER
      : process.env.REACT_APP_VPN_API_KEY_CREATE_FOLDER;
  }


  return process.env.REACT_APP_API_KEY_CREATE_FOLDER;
};

export const CREATE_FOLDER_URL = getCreateFolder();