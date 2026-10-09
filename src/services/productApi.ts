import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import { STALE_TIME_MS } from '../constants/student';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await apiClient.get('/products?limit=12'); // API yêu cầu
    return data;
};

export const useProductsQuery = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS, // Sử dụng thời gian staleTime tự động sinh
    });
};