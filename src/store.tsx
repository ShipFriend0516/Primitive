import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginStatus {
  isLoggedIn: undefined | boolean;
  userId: undefined | string;
  logout: () => void;
  login: (userId: string) => void;
}

const useStore = create(
  persist<LoginStatus>(
    (set) => ({
      isLoggedIn: undefined,
      userId: undefined,
      login: (userId: string) => {
        set({ isLoggedIn: true, userId: userId });
      },
      logout: () => set({ isLoggedIn: false, userId: undefined }),
    }),
    {
      name: 'login-status',
    },
  ),
);

export default useStore;
