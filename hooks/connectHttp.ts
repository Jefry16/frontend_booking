import axios, { AxiosRequestConfig } from "axios";
import { useMutation, useQuery } from "react-query";

const baseAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTc2ODUxMjY4M30.UlIyjnWQNaCNg6WgUScVUQCHIicOgXNVF1E-zG6JPDw",
  },
});

export async function fetchTableData(config: AxiosRequestConfig) {
  const { data } = await baseAxios.request(config);
  return data;
}
export function useFetch(url: string, config?: any) {
  return useQuery([url], () => baseAxios.get(url), {
    cacheTime: 0,
    staleTime: 0,
    ...config,
  });
}

export function useFetchById(
  id: number | string,
  axiosConfig: AxiosRequestConfig,
  queryConfig: any
) {
  return useQuery(
    [axiosConfig.url, id],
    () => baseAxios.get(`${axiosConfig.url}/${id}`),
    { ...queryConfig }
  );
}
export function useConnectPost() {
  return useMutation((config: any) => baseAxios.post(config.url, config.data));
}
