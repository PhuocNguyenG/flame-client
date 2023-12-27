"use client";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Type from "../type/type";
import { AddOrderDetail } from "../type/orderType";

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
      .post(`/order/add-order-detail`,data)
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
export const MutationApiAddOrderDetail = () => {
  return useMutation({
    mutationFn: (data: AddOrderDetail) => {
      return apiAddOrderDetail(data).then((res) => {
        return res.result as any;
      });
    },
  })
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
    axios
      .get(
        `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
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
export const QueryApiCity = () => {
  return useQuery({
    queryKey: ["apiCity"],
    queryFn: async () => {
      const res = await apiCity();
      return res || [];
    },
  });
};
