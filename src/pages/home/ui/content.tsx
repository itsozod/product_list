import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchProducts } from "../../../entities/product/api/api";
import Products from "@/src/entities/product/ui/product";
import Cart from "../cart/Cart";

const Home = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="w-full pt-10">
          <div className="max-w-[1440px] m-auto flex gap-7 justify-center">
            <div className="w-full max-w-[700px] m-2">
              <h1 className="text-2xl font-bold mb-7">Desserts</h1>
              <Products />
            </div>
            <div>
              <Cart />
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
};

export default Home;
