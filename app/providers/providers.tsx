"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            // Do not refetch on window focus
            refetchOnWindowFocus: false,
            // Do not refetch on mount if data is fresh
            refetchOnMount: false,
            // Do not refetch on reconnect if data is fresh
            refetchOnReconnect: false,
          },
        },
      })
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default Providers;
