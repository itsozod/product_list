"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { EmptyCard } from "@/src/shared/assets/icons/emptyCard";
import React, { useMemo } from "react";
import { useCartStore } from "../../../entities/cart/store/cart.store";
import { RemoveItem } from "@/src/shared/assets/icons/removeItem";
import { Button } from "@/src/shared/components/ui/button";
import { useProductStore } from "@/src/entities/product/store/product.store";
import { CartDialog } from "@/src/features";

const Cart = () => {
  const { cart, deleteFromCart } = useCartStore();
  const { deleteSelectedQuantities, deleteSelectedIds } = useProductStore();
  const cartItems = useMemo(
    () => cart?.reduce((acc, item) => acc + item?.quantity, 0),
    [cart]
  );
  const total = useMemo(
    () => cart?.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cart]
  );

  const CartParser = useMemo(() => {
    return cart?.map((item) => {
      return (
        <div className="flex flex-col gap-3" key={item?.id}>
          <div className="font-bold mt-4">{item?.name}</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="text-customRed font-bold">{item?.quantity}x</div>
              <div>@${item?.price}</div>
              <div>${item?.quantity * item?.price}</div>
            </div>
            <Button
              style={{
                border: "1px solid hsl(14, 25%, 72%)",
              }}
              onClick={() => {
                deleteFromCart(item.id);
                deleteSelectedQuantities(item.id);
                deleteSelectedIds(item.id);
              }}
              className="flex justify-center items-center bg-[#fff] hover:bg-[#fff] rounded-[50%]  w-[20px] h-[20px] p-1 "
            >
              <RemoveItem />
            </Button>
          </div>
          <hr />
        </div>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, deleteFromCart]);

  return (
    <div>
      <Card className="w-full sm:w-[350px] border-none bg-white">
        <CardHeader>
          <CardTitle className="text-amber-800">
            Your cart ({cartItems})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart?.length === 0 ? (
            <div className="flex items-center justify-center flex-col">
              <EmptyCard />
              <div className="text-amber-800">
                Your added items will appear here
              </div>
            </div>
          ) : (
            <div className="scrollbar-none max-h-[300px] overflow-auto">
              {CartParser}
            </div>
          )}
          {cart?.length !== 0 && (
            <>
              <div className="flex justify-between mt-3 mb-4">
                <p>Order total</p>
                <h1 className="font-bold text-lg">${total}</h1>
              </div>
              <CartDialog />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
