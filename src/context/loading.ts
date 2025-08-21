import { create } from "zustand";

type LoadingType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const getLoadingStore = create<LoadingType>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export { getLoadingStore };