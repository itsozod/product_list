import { useCartStore } from "@/src/entities/cart/store/cart.store";
import { Button } from "@/src/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import Image from "next/image";
import { useMemo } from "react";

const CartDialog = () => {
  const { cart } = useCartStore();

  const total = useMemo(
    () => cart?.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full bg-[hsl(14,86%,42%)] hover:bg-[hsl(14,86%,42%)]">
          Confirm order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order confirmed</DialogTitle>
          <DialogDescription>We hope you enjoy your food!</DialogDescription>
        </DialogHeader>
        <div className="bg-[--bg] p-4 rounded-[12px] scrollbar-none max-h-[300px] overflow-auto">
          {cart?.map((item) => {
            return (
              <div className="flex flex-col gap-3" key={item?.id}>
                <div className="font-bold mt-4">{item?.name}</div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Image src={item.thumbnail_img} alt="Image" />
                    <div className="text-customRed font-bold">
                      {item?.quantity}x
                    </div>
                    <div>@${item?.price}</div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between mt-3 mb-4">
            <p>Order total</p>
            <h1 className="font-bold text-lg">${total}</h1>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
