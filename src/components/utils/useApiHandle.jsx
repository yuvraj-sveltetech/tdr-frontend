import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useApiHandle = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_KEY;
  let headers = {
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("auth_token")) {
    headers.Authorization = `Bearer ${localStorage.getItem("auth_token")}`;
  }

  const apiCall = async (method, url, payload) => {
    setLoading(true);
    try {
      const res = await axios({
        headers: headers,
        method: method,
        url: baseUrl + url,
        data: payload,
      });
      setData(res);
      toast.success(res?.data?.Message);
    } catch (err) {
      toast.error(err?.response?.data?.Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, apiCall };
};
export default useApiHandle;
