import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyCard } from "@/src/shared/assets/icons/emptyCard";
import React from "react";

const Cart = () => {
  return (
    <Card className="w-[350px]">
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
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
};

export default Cart;
