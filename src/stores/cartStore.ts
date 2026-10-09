import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '../constants/student';

export interface CartItem { id: number; title: string; price: number; quantity: number; }
interface CartState {
    items: CartItem[]; shippingFee: number | null;
    addItem: (item: CartItem) => void; removeItem: (id: number) => void;
    setShippingFee: (fee: number | null) => void;
    totalQuantity: () => number; totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        items: [], shippingFee: null,
        addItem: (item) => set((state) => {
            const exist = state.items.find(i => i.id === item.id);
            if (exist) return { items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
            return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
        removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
        setShippingFee: (fee) => set({ shippingFee: fee }),
        totalQuantity: () => get().items.reduce((s, i) => s + i.quantity, 0),
        totalAmount: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }), { name: `ktxgo-cart-${STUDENT.mssv}`, storage: createJSONStorage(() => AsyncStorage) }
    )
);