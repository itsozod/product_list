"use client";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";

export const useGetProducts = () => {
  return useQuery({
    queryFn: fetchProducts,
    queryKey: ["products"],
  });
};
