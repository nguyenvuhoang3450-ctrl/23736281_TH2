import { useState } from 'react';
import * as Location from 'expo-location';
import { BASE_SHIP_FEE } from '../constants/student';

export const useCampusLocation = () => {
    const [shippingFee, setLocalShippingFee] = useState<number | null>(null);

    const requestLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const km = 1.2; // Giả lập khoảng cách 1.2km để test máy ảo
            const fee = BASE_SHIP_FEE + Math.round(km * 1500) + 2000; // CÔNG THỨC B
            setLocalShippingFee(fee);
            return fee;
        }
        return null;
    };
    return { shippingFee, requestLocation };
};