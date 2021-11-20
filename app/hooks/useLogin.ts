import { useState, useEffect } from "react";
import axios from "axios";
import * as types from "../types/Types";
import { useStore } from "../store/index";
import useApi from "./useApi";
const loginFunction = async (username: String, password: String) => {
  const result = await axios.post(
    "https://zones-backend-halan.herokuapp.com/login",
    {
      username: username,
      password: password,
    }
  );
  return result;
};
const useLogin = () => {
  const [error, setError] = useState<Boolean>(false);
  const { getZones } = useApi();
  const { addToken, removeToken, token, removeZones } = useStore();

  useEffect(() => {
    setError(false);
  }, [token]);
  const login = (loginObject: types.LoginObject) => {
    loginFunction(loginObject.username, loginObject.password)
      .then((result) => {
        if (result.status === 200 && result.data.message === "Auth sucessful") {
          addToken(result.data.token);
          setError(false);
          getZones(result.data.token);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(error);
      });
  };

  const logout = () => {
    removeToken();
    removeZones();
  };

  return { login, logout, error };
};

export default useLogin;
