"use client";
import React, { useCallback, useMemo, useState } from "react";

import { Product } from "@/src/entities/product/model/model";
import { useGetProducts } from "../api/useGetProducts";
import Image from "next/image";
import { useCartStore } from "@/src/pages/home/cart/store/cart.store";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@/src/shared/assets/icons/addToCart";

const Products = () => {
  const { products, error, isLoading } = useGetProducts();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const { cart, addToCart, setCart } = useCartStore();

  const handleAddCart = useCallback(
    (product: Product) => {
      // check if added product is already in the cart
      const alreadyExists = cart?.some((item) => item?.id === product?.id);
      // if yes, find it and increase its quantity by one, else add a new product to cart
      if (alreadyExists) {
        const increaseQuantityOfExisted = cart?.map((item) =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
        setCart(increaseQuantityOfExisted);
      } else {
        addToCart({ ...product, quantity: 1 });
      }
    },
    [addToCart, cart, setCart]
  );

  console.log("ids", selectedIds);

  // parser for products
  const ProductsParser = useMemo(() => {
    return products?.success?.map((product: Product) => {
      return (
        <>
          <div
            key={product?.id}
            className="flex flex-col gap-6 relative" // Add relative here for parent positioning
            onClick={() => {
              handleAddCart(product);
              setSelectedIds((prev) => {
                return new Set(prev.add(product?.id));
              });
            }}
          >
            <div
              className="rounded-[14px]"
              style={{
                border: selectedIds?.has(product?.id)
                  ? "2px solid hsl(14, 86%, 42%)"
                  : "none",
              }}
            >
              <Image
                src={product?.img}
                alt={product?.name}
                className="w-[100%] h-[220px] rounded-[12px] object-cover"
                width={250}
                height={220}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-gray-500">{product?.name}</p>
              <p className="m-0 font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                {product?.title}
              </p>
              <div className="text-amber-600 font-semibold">
                ${product?.price}
              </div>
            </div>

            <div className="flex justify-center items-center absolute inset-0 top-[35%]">
              <Button className="flex gap-2 bg-white text-black border-[1px] border-[hsl(14,86%,42%)] rounded-[50px] hover:text-white">
                <AddToCart />
                Add to cart
              </Button>
            </div>
          </div>
        </>
      );
    });
  }, [products, handleAddCart]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error?.message}</div>;

  if (products?.error) {
    return <div>Error: {products.error}</div>;
  }
  if (products?.success?.length === 0) return <div>No products!</div>;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-7">
        {ProductsParser}
      </div>
    </>
  );
};

export default Products;
