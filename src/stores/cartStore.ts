import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '../constants/student';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    changeQty: (id: number, qty: number) => void;
    totalQuantity: () => number;
    totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existing = state.items.find(i => i.id === item.id);
                if (existing) {
                    return { items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }),
            removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
            changeQty: (id, qty) => set((state) => ({
                items: state.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
            })),
            totalQuantity: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
            totalAmount: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);