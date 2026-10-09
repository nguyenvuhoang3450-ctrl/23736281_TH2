import { useState } from 'react';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { BASE_SHIP_FEE } from '../constants/student';

// Tọa độ KTX giả định (ví dụ: Trường Đại học Công nghiệp TP.HCM)
const KTX_COORDS = { latitude: 10.8221, longitude: 106.6868 };

// Công thức Haversine tính khoảng cách (km) giữa 2 tọa độ
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const useCampusLocation = () => {
    const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [shippingFee, setLocalShippingFee] = useState<number | null>(null);

    const requestLocation = async () => {
        // Xin quyền Location (runtime)
        const { status: currentStatus, canAskAgain } = await Location.getForegroundPermissionsAsync();
        let finalStatus = currentStatus;

        if (currentStatus !== Location.PermissionStatus.GRANTED && canAskAgain) {
            const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
            finalStatus = newStatus;
        }

        setStatus(finalStatus);

        if (finalStatus === Location.PermissionStatus.GRANTED) {
            try {
                const location = await Location.getCurrentPositionAsync({});
                const km = getDistance(
                    location.coords.latitude,
                    location.coords.longitude,
                    KTX_COORDS.latitude,
                    KTX_COORDS.longitude
                );
                setDistanceKm(km);

                // Áp dụng Công thức B: B = BASE_SHIP_FEE + Math.round(km * 1500) + 2000[cite: 1]
                const fee = BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
                setLocalShippingFee(fee);
                return fee;
            } catch (error) {
                console.log("Lỗi lấy vị trí", error);
            }
        }
        return null;
    };

    const openSettings = () => {
        Linking.openSettings(); // Hỗ trợ mở Cài đặt nếu bị Blocked[cite: 1]
    };

    return { status, distanceKm, shippingFee, requestLocation, openSettings };
};