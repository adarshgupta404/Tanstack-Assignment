import { create } from "zustand";

type OpenCloseMode = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const getOpenCloseModel = create<OpenCloseMode>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));



export {getOpenCloseModel};
