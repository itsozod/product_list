"use client";
import React, { useMemo } from "react";
import styles from "./products.module.css";

import { Product } from "@/src/entities/product/model/model";
import { useGetProducts } from "../api/useGetProducts";
import Image from "next/image";

const Products = () => {
  const { data: products, error, isLoading } = useGetProducts();
  // parser for products
  const ProductsParser = useMemo(() => {
    return products?.success?.map((product: Product) => {
      return (
        <>
          <div key={product?.id} className={styles["product_card"]}>
            <div>
              <Image
                src={product?.img}
                alt={product?.name}
                style={{
                  width: "100%",
                  height: "170px",
                  borderRadius: "12px",
                }}
                width={250}
                height={150}
                loading="lazy"
              />
            </div>
            <div className={styles["product_info"]}>
              <p style={{ margin: 0, color: "grey" }}>{product?.name}</p>
              <p style={{ margin: 0, fontWeight: "bold" }}>{product?.title}</p>
              <div style={{ color: "brown" }}>${product?.price}</div>
            </div>
          </div>
        </>
      );
    });
  }, [products?.success]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error?.message}</div>;

  if (products?.error) {
    return <div>Error: {products.error}</div>;
  }
  if (products?.success?.length === 0) return <div>No products!</div>;

  return <div className={styles["products_container"]}>{ProductsParser}</div>;
};

export default Products;
