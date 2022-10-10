import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useApiHandle = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_KEY;

  const apiCall = async (method, url, payload) => {
    setLoading(true);
    try {
      const res = await axios({
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
