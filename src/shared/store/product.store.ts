import { SelectedQuantity } from "@/src/entities/product/model/model";
import { create } from "zustand";

interface ProductItem {
  selectedIds: Set<string>;
  selectedQuantities: SelectedQuantity;
  handleSelectedIds: (id: string) => void;
  handleSelectedQuantities: (id: string) => void;
  deleteSelectedIds: (id: string) => void;
  deleteSelectedQuantities: (id: string) => void;
}

export const useProductStore = create<ProductItem>()((set) => ({
  selectedIds: new Set(),
  selectedQuantities: {},
  handleSelectedIds: (id) => {
    set((state) => {
      const newSet = new Set(state.selectedIds);
      newSet.add(id);
      return { selectedIds: newSet };
    });
  },
  deleteSelectedIds: (id) => {
    set((state) => {
      const newSet = new Set(state.selectedIds);
      newSet.delete(id);
      return { selectedIds: newSet };
    });
  },
  handleSelectedQuantities: (id) => {
    set((state) => {
      if (state.selectedQuantities[id]) {
        state.selectedQuantities[id] = state.selectedQuantities[id] + 1;
      } else {
        state.selectedQuantities[id] = 1;
      }
      return { selectedQuantities: state.selectedQuantities };
    });
  },

  deleteSelectedQuantities: (id) => {
    set((state) => {
      if (state.selectedQuantities[id]) {
        delete state.selectedQuantities[id];
      }
      return { selectedQuantities: state.selectedQuantities };
    });
  },
}));
