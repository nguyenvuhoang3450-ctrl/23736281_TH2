import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../services/productApi';
import { PRICE_MULTIPLIER } from '../constants/student';

interface ProductCardProps {
    item: Product;
    onPress: () => void;
    onAdd: () => void;
}

export default function ProductCard({ item, onPress, onAdd }: ProductCardProps) {
    const price = Math.round(item.price * PRICE_MULTIPLIER);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imagePlaceholder} />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.price}>{price.toLocaleString('vi-VN')} đ</Text>

            <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
                <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { flex: 1, backgroundColor: '#FFFFFF', margin: 5, padding: 10, borderRadius: 8, elevation: 2 },
    imagePlaceholder: { height: 100, backgroundColor: '#BFDBFE', borderRadius: 8, marginBottom: 10 },
    title: { fontSize: 14, color: '#1E3A8A', fontWeight: 'bold', height: 40 },
    price: { fontSize: 14, color: '#1D4ED8', marginVertical: 5 },
    addBtn: { backgroundColor: '#1D4ED8', padding: 10, borderRadius: 20, alignItems: 'center', alignSelf: 'flex-end' },
    addBtnText: { color: '#FFFFFF', fontWeight: 'bold' }
});