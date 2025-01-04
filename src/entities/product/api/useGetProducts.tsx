"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";
import { Product } from "../model/model";

export const useGetProducts = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { products, isLoading };
};
