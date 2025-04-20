export const fetchProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
