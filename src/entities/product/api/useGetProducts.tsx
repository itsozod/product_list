"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";

export const useGetProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { products, isLoading };
};
