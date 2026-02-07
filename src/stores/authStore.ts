import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  siteId: string | null;
  setUser: (user: User | null) => void;
  setSiteId: (siteId: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      siteId: null,
      setUser: (user) => set({ user }),
      setSiteId: (siteId) => set({ siteId }),
      logout: () => set({ user: null, siteId: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);