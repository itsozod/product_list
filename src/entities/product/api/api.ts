export const fetchProducts = async () => {
  try {
    const response = await fetch("https://4c32c6dbe04d4121.mokky.dev/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
