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

export function useFetchById(id: number | string, config: AxiosRequestConfig) {
  return useQuery([config.url, id], () => baseAxios.get(`${config.url}/${id}`));
}
export function useConnectPost() {
  return useMutation((config: any) => baseAxios.post(config.url, config.data));
}
