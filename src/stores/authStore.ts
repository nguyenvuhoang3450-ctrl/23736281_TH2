import { create } from 'zustand';
interface AuthState {
    token: string | null;
    login: (mssv: string, stamp: string) => void;
    logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    login: (mssv, stamp) => set({ token: `ktxgo-${mssv}-${stamp}` }),
    logout: () => set({ token: null }),
}));