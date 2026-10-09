import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCampusLocation } from '../hooks/useCampusLocation';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

export default function MeScreen() {
    const { shippingFee, requestLocation } = useCampusLocation();
    const setStoreFee = useCartStore(state => state.setShippingFee);
    const logout = useAuthStore(state => state.logout);

    return (
        <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
            <Text>Phí ship ước tính: {shippingFee ?? '--'} đ</Text>
            <TouchableOpacity onPress={async () => { const fee = await requestLocation(); if (fee) setStoreFee(fee); }}>
                <Text>Lấy vị trí ước tính ship</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={{ marginTop: 20 }}>
                <Text style={{ color: 'red' }}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}