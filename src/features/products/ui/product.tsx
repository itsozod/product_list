"use client";
import React, { useCallback, useMemo } from "react";
import { Product } from "@/src/entities/product/model/model";
import { useGetProducts } from "../../../entities/product/api/useGetProducts";
import Image from "next/image";
import { useCartStore } from "@/src/entities/cart/store/cart.store";
import { Button } from "@/src/shared/components/ui/button";
import { AddToCart } from "@/src/shared/assets/icons/addToCart";
import { useProductStore } from "@/src/entities/product/store/product.store";
import { DecrementQuantity } from "@/src/shared/assets/icons/decrementQuantity";
import { IncrementQuantity } from "@/src/shared/assets/icons/incrementQuantity";

const Products = () => {
  const { products, isLoading, isSuccess } = useGetProducts();
  const { cart, addToCart, setCart } = useCartStore();
  const {
    selectedQuantities,
    selectedIds,
    handleSelectedQuantities,
    handleDecSelectedQuantities,
    handleSelectedIds,
  } = useProductStore();

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

  const handleDecreaseCartQuantity = useCallback(
    (id: string) => {
      const decrease = cart?.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      const filterZeroQuantity = decrease?.filter(
        (item) => item.quantity !== 0
      );
      setCart(filterZeroQuantity);
    },

    [cart, setCart]
  );

  // parser for products
  const ProductsParser = useMemo(() => {
    return products?.map((product) => {
      return (
        <>
          <div key={product?.id} className="flex flex-col gap-6 relative">
            <div
              className={`rounded-[14px] border-2 ${
                selectedIds.has(product.id)
                  ? "border-[hsl(14,86%,42%)]"
                  : "border-transparent"
              }`}
            >
              <Image
                src={product?.img}
                alt={product?.name}
                className="w-[100%] h-[220px] rounded-[12px] object-fill"
                width={250}
                height={220}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[--bg-rose-400]">{product?.name}</p>
              <p className="m-0 font-bold text-ellipsis overflow-hidden whitespace-nowrap text-[--bg-rose-900]">
                {product?.title}
              </p>
              <div className="text-amber-600 font-semibold">
                ${product?.price}
              </div>
            </div>
            <div className="flex justify-center items-center absolute inset-0 top-[35%]">
              {selectedQuantities[product?.id] ? (
                <div className="bg-[hsl(14,86%,42%)] rounded-[50px]">
                  <div className="flex items-center gap-6 py-2 px-4">
                    <Button
                      size={"icon"}
                      className="bg-transparent hover:bg-transparent border border-white rounded-[50px] w-[20px] h-[20px] "
                      onClick={() => {
                        handleDecreaseCartQuantity(product.id);
                        handleDecSelectedQuantities(product.id);
                      }}
                    >
                      <DecrementQuantity />
                    </Button>
                    <p className="text-white">
                      {selectedQuantities[product?.id]}
                    </p>
                    <Button
                      className="bg-transparent hover:bg-transparent border border-white rounded-[50px] w-[20px] h-[20px]"
                      size={"icon"}
                      onClick={() => {
                        handleSelectedQuantities(product?.id);
                        handleAddCart(product);
                      }}
                    >
                      <IncrementQuantity />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    handleAddCart(product);
                    handleSelectedIds(product.id);
                    handleSelectedQuantities(product?.id);
                  }}
                  className="flex gap-2 bg-white text-black border-[1px] border-[hsl(14,86%,42%)] rounded-[50px] hover:text-white"
                >
                  <AddToCart />
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </>
      );
    });
  }, [
    products,
    selectedIds,
    handleAddCart,
    selectedQuantities,
    handleDecSelectedQuantities,
    handleDecreaseCartQuantity,
    handleSelectedIds,
    handleSelectedQuantities,
  ]);

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess && products?.length === 0) return <div>No products!</div>;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-6">
        {ProductsParser}
      </div>
    </>
  );
};

export default Products;
