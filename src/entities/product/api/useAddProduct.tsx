"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./api";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // queryClient.resetQueries({ queryKey: ["products"] });
      // queryClient.removeQueries({ queryKey: ["products"] });
    },
  });
};
