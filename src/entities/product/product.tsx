"use client";
import React from "react";

import { Product } from "@/src/entities/product/model/model";
import { useGetProducts } from "./api/useGetProducts";

const Products = () => {
  const { data: products, error, isLoading } = useGetProducts();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error?.message}</div>;

  if (products?.error) {
    return <div>Error: {products.error}</div>;
  }
  if (products?.success?.length === 0) return <div>No products!</div>;
  return (
    <div>
      {products?.success?.map((product: Product) => {
        return (
          <>
            <div>{product?.name}</div>
          </>
        );
      })}
    </div>
  );
};

export default Products;
