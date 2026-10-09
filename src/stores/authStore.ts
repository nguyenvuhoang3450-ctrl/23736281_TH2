import { create } from 'zustand';

interface AuthState {
    token: string | null;
    login: (phone: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    token: null,
    login: (phone) => set({ token: `ktxgo-23736281-${Date.now()}` }),
    logout: () => set({ token: null }),
}));