import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchProducts } from "../../../entities/product/api/api";
import AppContainer from "@/src/widgets/AppContainer";
import Cart from "../cart/Cart";
import { Products } from "@/src/features";

const Home = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: async () => fetchProducts(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppContainer>
          <div className="w-full flex flex-col md:flex-row justify-between max-w-[1100px]">
            <div className="w-full max-w-[700px] m-2">
              <h1 className="text-2xl font-bold mb-7">Desserts</h1>
              <Products />
            </div>
            <Cart />
          </div>
        </AppContainer>
      </HydrationBoundary>
    </>
  );
};
export const dynamic = "force-dynamic";
export default Home;
