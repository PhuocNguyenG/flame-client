"use client";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Type from "../type/type";
import { AddOrderDetail } from "../type/orderType";
import CityData from "../../assets/city-data.json";
import { QUERY_KEY } from "../contants";

// Config
const axiosDefault = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiSearchByKey = async (key: string, lang: string) => {
  return new Promise<Type.ApiResult>((resolve) => {
    axiosDefault
      .get(`/common/search/${lang}/${key}`)
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
 * @param lang Language code
 * @returns Array[]
 */
export const QueryApiSearchByKey = (key: string, lang: string) => {
  return useQuery({
    queryKey: ["search", `${key}-${lang}`],
    queryFn: () => {
      if (!key) return [];
      return apiSearchByKey(key, lang).then((res) => {
        return res.result as Type.SearchByKeyResponse[];
      });
    },
  });
};

export const apiAddOrderDetail = async (data: AddOrderDetail) => {
  return new Promise<Type.ApiResult>((resolve) => {
    axiosDefault
      .post(`/order/add-order-detail`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
};

export const useAddOrderDetail = (onSuccessFn?:object) => {
  const {
    mutate: addOrder,
    isSuccess,
    isIdle,
    isPending,
  } = useMutation({
    mutationFn: async (data: AddOrderDetail) => {
      const res = await apiAddOrderDetail(data);
      return res.result as any;
    },
    onSuccess: () => onSuccessFn,
  });

  return { addOrder, isSuccess, isIdle, isPending };
};

export const apiCity = async () => {
  return new Promise<
    {
      Id: string;
      Name: string;
      Districts: {
        Id: string;
        Name: string;
        Wards: { Id: string; Name: string; Level: string }[];
      }[];
    }[]
  >((resolve) => {
    resolve(CityData as any);
  });
};
/**
 * Query search by key
 * @param key Search string
 * @param lang Language code
 * @returns Array[]
 */
export const QueryApiCity = () => {
  return useQuery({
    queryKey: ["apiCity"],
    queryFn: async () => {
      const res = await apiCity();
      return res || [];
    },
  });
};
