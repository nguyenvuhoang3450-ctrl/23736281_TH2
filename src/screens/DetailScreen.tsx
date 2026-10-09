import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useProductsQuery } from '../services/productApi';
import { useCartStore } from '../stores/cartStore';
import { STUDENT, VARIANT, PRICE_MULTIPLIER, examStamp } from '../constants/student';

export default function DetailScreen({ route, navigation }: any) {
    const { id } = route.params; // Nhận id từ route.params
    const { data } = useProductsQuery(); // Lấy dữ liệu từ cache[cite: 1]
    const addItem = useCartStore(state => state.addItem);

    const product = data?.find(item => item.id === id);

    if (!product) {
        return <View style={styles.center}><Text>Không tìm thấy sản phẩm</Text></View>;
    }

    const price = Math.round(product.price * PRICE_MULTIPLIER);

    const handleAddToCart = () => {
        // Haptic theo quy định VARIANT là 'selection'[cite: 1]
        if (VARIANT.hapticOnAdd === 'impact') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            Haptics.selectionAsync();
        }

        addItem({ id: product.id, title: product.title, price, quantity: 1 });
        Alert.alert(`TH2 - ${STUDENT.mssv}`, 'Đã thêm vào giỏ hàng!'); // Alert ngắn có MSSV[cite: 1]
        navigation.goBack(); // Nút back của Stack[cite: 1]
    };

    return (
        <View style={styles.container}>
            <View style={styles.imagePlaceholder} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{price.toLocaleString('vi-VN')} đ</Text>
            <Text style={styles.subtitle}>Giao nội khu · nhận tận phòng</Text>

            <Text style={styles.desc} numberOfLines={3}>{product.description}</Text>

            <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
                <Text style={styles.btnText}>Thêm vào giỏ · Haptic</Text>
            </TouchableOpacity>

            {!VARIANT.watermarkAtTop && (
                <Text style={styles.watermark}>TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#EFF6FF', padding: 20 },
    imagePlaceholder: { height: 200, backgroundColor: '#BFDBFE', borderRadius: 8, marginBottom: 20 },
    title: { fontSize: 22, color: '#1E3A8A', fontWeight: 'bold' },
    price: { fontSize: 20, color: '#1D4ED8', marginVertical: 10, fontWeight: 'bold' },
    subtitle: { color: '#64748B', marginBottom: 20 },
    desc: { color: '#1E3A8A', marginBottom: 30, lineHeight: 22 },
    btn: { backgroundColor: '#1D4ED8', padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    watermark: { position: 'absolute', bottom: 20, alignSelf: 'center', color: '#1E3A8A', fontSize: 12, fontWeight: 'bold' }
});