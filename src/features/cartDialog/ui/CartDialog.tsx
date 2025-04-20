import { CartItem, useCartStore } from "@/src/entities/cart/store/cart.store";
import { ConfirmIcon } from "@/src/shared/assets/icons/confirmIcon";
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

const CartDialog = ({ cart, total }: { cart: CartItem[]; total: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full bg-[hsl(14,86%,42%)] hover:bg-[hsl(14,86%,42%)]">
          Confirm Order
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[400px] rounded-[12px]">
        <DialogHeader className="flex flex-col justify-start items-start">
          <ConfirmIcon />
          <DialogTitle className="text-[2rem] font-bold text-[--bg-rose-900]">
            Order confirmed
          </DialogTitle>
          <DialogDescription className="text-[--bg-rose-500]">
            We hope you enjoy your food!
          </DialogDescription>
        </DialogHeader>
        <div className="bg-[--bg] p-2 rounded-[12px]">
          <div className="flex flex-col gap-2 scrollbar-none max-h-[200px] overflow-auto">
            {cart?.map((item) => {
              return (
                <>
                  <div
                    className="flex gap-2 items-center justify-between"
                    key={item.id}
                  >
                    <div className="flex gap-3">
                      <Image
                        width={50}
                        height={30}
                        src={item.thumbnail_img}
                        className="rounded-[8px]"
                        alt="Image"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-semibold text-[14px] text-[--bg-rose-900]">
                          {item?.title}
                        </p>
                        <div className="flex gap-3">
                          <div className="text-customRed font-bold">
                            {item?.quantity}x
                          </div>
                          <div className="text-[--bg-rose-500]">
                            @${item?.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[--bg-rose-900]">
                      ${item?.quantity * item?.price}
                    </div>
                  </div>
                  <hr className="text-[--bg-rose-100]" />
                </>
              );
            })}
          </div>
          <div className="flex w-full justify-between mt-3 mb-4">
            <p className="font-light text-[--bg-rose-900]">Order total</p>
            <p className="font-bold text-lg text-[--bg-rose-900]">${total}</p>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full rounded-full bg-[hsl(14,86%,42%)] hover:bg-[hsl(14,86%,42%)]">
            Start New Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
