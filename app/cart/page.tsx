"use client";

import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  return (
    <>
      <div>Cart page</div>
      <button onClick={() => router.push("/")}>Home page</button>
    </>
  );
};

export default Cart;
