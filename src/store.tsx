import { UseBoundStore, create } from "zustand";

interface LoginStatus {
  isLoggedIn: undefined | boolean;
  logout: () => void;
  login: () => void;
}

const useStore = create<LoginStatus>((set) => ({
  isLoggedIn: undefined,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useStore;
