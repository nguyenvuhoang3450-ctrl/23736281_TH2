import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCartStore } from '../stores/cartStore';

export default function CartScreen() {
    const { items, totalAmount } = useCartStore();
    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#EFF6FF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1D4ED8' }}>Giỏ hàng</Text>
            <FlatList data={items} renderItem={({ item }) => <Text>{item.title} - SL: {item.quantity}</Text>} />
            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Tổng: {totalAmount()} đ</Text>
        </View>
    );
}
