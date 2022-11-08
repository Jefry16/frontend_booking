import { useState, useCallback } from "react";
import RequestConfigInterface from "../interfaces/request-config.interface";

const BASE_URL = "http://localhost:3000";
const BASE_HEADERS = {
  "Content-Type": "application/json",
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig: RequestConfigInterface, applyData: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const { url, method, body, headers } = requestConfig;

        const response = await fetch(BASE_URL + url, {
          method: method || "get",
          body: JSON.stringify(body) || null,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            ...BASE_HEADERS,
            ...headers,
          },
          credentials: "include",
        });
        if (response.status === 403) {
          refreshToken(requestConfig, applyData);
        } else {
          const data = await response.json();
          applyData(data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

async function refreshToken(
  requestConfig: RequestConfigInterface,
  applyData: any
) {
  try {
    // refresh token request
    const refreshRequest = await fetch(BASE_URL + "/auth/refresh", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const refreshRequestJson = await refreshRequest.json();
    localStorage.setItem("token", refreshRequestJson.token);

    if (refreshRequest.status !== 201) {
      window.location.replace("http://localhost:5173" + "/login");
      return;
    }
    // make first request
    const { url, method, body, headers } = requestConfig;
    const retryRequest = await fetch(BASE_URL + url, {
      method,
      body: JSON.stringify(body) || null,
      headers: {
        ...BASE_HEADERS,
        ...headers,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
    });
    const data = await retryRequest.json();
    applyData(data);
  } catch (error) {}
}

export default useHttp;
