import { create } from "zustand";

const useStore = create((set) => ({
  isLoggedIn: undefined,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useStore;
