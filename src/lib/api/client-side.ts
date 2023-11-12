"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as Type from "../type";

// Config
const axiosDefault = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiSearchByKey = async (key: string, lng: string) => {
  return new Promise<Type.ApiResult>((resolve) => {
    axiosDefault
      .get(`/common/search/${lng}/${key}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
};
/**
 * Query search by key
 * @param key Search string
 * @param lng Language code
 * @returns Array[]
 */
export const QueryApiSearchByKey = (key: string, lng: string) => {
  return useQuery({
    queryKey: ["search", `${key}-${lng}`],
    queryFn: () => {
      if (!key) return [];
      return apiSearchByKey(key, lng).then((res) => {
        return res.result as Type.SearchByKeyResponse[];
      });
    },
  });
};
