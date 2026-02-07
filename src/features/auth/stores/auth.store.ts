import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setIsAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  loading: false,
  error: null,
  setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));