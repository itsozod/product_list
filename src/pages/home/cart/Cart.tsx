"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyCard } from "@/src/shared/assets/icons/emptyCard";
import React, { useMemo } from "react";
import { useCartStore } from "./store/cart.store";
import { RemoveItem } from "@/src/shared/assets/icons/removeItem";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart, deleteFromCart } = useCartStore();
  const cartItems = useMemo(
    () => cart?.reduce((acc, item) => acc + item?.quantity, 0),
    [cart]
  );

  const CartParser = useMemo(() => {
    return cart?.map((item, index, cart) => {
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
              onClick={() => deleteFromCart(item)}
              className="flex justify-center items-center bg-[#fff] hover:bg-[#fff] rounded-[50%]  w-[20px] h-[20px] p-1 "
            >
              <RemoveItem />
            </Button>
          </div>
          {cart?.length - 1 !== index && <hr />}
        </div>
      );
    });
  }, [cart, deleteFromCart]);

  return (
    <Card className="w-[350px] border-none bg-white">
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
          CartParser
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;
