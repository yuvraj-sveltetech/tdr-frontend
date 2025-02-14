import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useAuthToken = () => {
  const [token, setToken] = useState(Cookies.get("ss_tkn"));

  useEffect(() => {
    const checkAuthToken = () => {
      const newToken = Cookies.get("ss_tkn");

      if (newToken !== token) {
        setToken(newToken);

        localStorage.setItem("auth_change", Date.now());
      }
    };

    const interval = setInterval(checkAuthToken, 1000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const handleAuthChange = (event) => {
      if (event.key === "auth_change") {
        window.close();
        if (!window.closed) {
          window.close();
          // window.location.replace(`${process.env.REACT_APP_REDIRECT_URL}:5001/`);
        }
      }
    };

    window.addEventListener("storage", handleAuthChange);

    return () => window.removeEventListener("storage", handleAuthChange);
  }, []);
};
