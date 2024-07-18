import { Product } from "../model/model";

export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const addProduct = async (product) => {
  try {
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
};
