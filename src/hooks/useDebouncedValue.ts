import { useState, useEffect } from 'react';
import { DEBOUNCE_MS } from '../constants/student';

export function useDebouncedValue<T>(value: T): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, DEBOUNCE_MS); // Thời gian chờ lấy từ biến DEBOUNCE_MS[cite: 1]

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}