"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";

export const useGetProducts = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    placeholderData: (data) => data?.success,
  });
  return { products, error, isLoading };
};
