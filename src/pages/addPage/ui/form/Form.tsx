"use client";
import { useAddProduct } from "@/src/entities/product/api/useAddProduct";
import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const { mutateAsync } = useAddProduct();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const obj = {
          name: name,
          title: name,
          price: 10,
        };
        mutateAsync(obj);
      }}
    >
      <input
        placeholder="products name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add product</button>
    </form>
  );
};

export default Form;
