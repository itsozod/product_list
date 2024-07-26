import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchProducts } from "../../../entities/product/api/api";
import Products from "@/src/entities/product/ui/product";

const Home = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>
      <h1>Desserts</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Products />
      </HydrationBoundary>
    </>
  );
};

export default Home;
