export const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
