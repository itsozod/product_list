import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyCard } from "@/src/shared/assets/icons/emptyCard";
import React from "react";

const Cart = () => {
  return (
    <Card className="w-full max-w[350px] border-none bg-white">
      <CardHeader>
        <CardTitle className="text-amber-800">Your cart (0)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center flex-col">
          <EmptyCard />
          <div className="text-amber-800">
            Your added items will appear here
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
