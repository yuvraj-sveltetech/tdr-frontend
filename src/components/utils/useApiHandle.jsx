import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as URL from "../utils/ConstantUrl";
import { useNavigate } from "react-router-dom";

const useApiHandle = () => {
  const [apiData, setApiData] = useState({ data: {}, status_code: 0 });
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();

  let accessToken = localStorage.getItem("auth_token");
  let refreshToken = localStorage.getItem("refresh_token");

  const apiCall = async (method, url, payload, signal) => {
    setLoading(true);

    const axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      signal,
    });

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
      async function (config) {
        // Do something before request is sent
        config.data =
          payload instanceof FormData
            ? payload
            : { ...config.data, ...payload };
        if (localStorage.getItem("auth_token")) {
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "auth_token"
          )}`;
        }
        return config;
      },
      async function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Function to refresh the access token using the refresh token
    async function refreshAccessToken() {
      try {
        const response = await axios.post(baseUrl + URL.REFRESH, {
          refresh_token: refreshToken,
        });
        accessToken = response.data.access_token;
        localStorage.setItem("auth_token", response.data.access_token);
      } catch (err) {
        localStorage.clear();
        navigate("/");
        throw err;
      }
    }

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      async function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          return refreshAccessToken().then(() => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          });
        }

        return Promise.reject(error);
      }
    );

    axiosInstance[method](url, payload)
      .then((res) => {
        setApiData({
          data: res?.data,
          status_code: res?.status,
        });
        setLoading(false);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        setLoading(false);
        setApiData({});
      });
  };

  return {
    data: apiData?.data,
    loading,
    apiCall,
    status_code: apiData?.status_code,
  };
};
export default useApiHandle;
