import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { useProductsQuery, Product } from '../services/productApi';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { STUDENT, ROOM_LABEL, PRICE_MULTIPLIER, VARIANT, examStamp } from '../constants/student';
import { useCartStore } from '../stores/cartStore';

export default function HomeScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebouncedValue(searchQuery);
    const { data, isPending, isError, refetch, isRefetching } = useProductsQuery(); // React Query hooks[cite: 1]
    const addItem = useCartStore(state => state.addItem);

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!debouncedSearch) return data;
        return data.filter(item => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [data, debouncedSearch]);

    const handleAddToCart = (item: Product) => {
        // Haptic theo VARIANT (selection do số cuối là 1)[cite: 1]
        if (VARIANT.hapticOnAdd === 'impact') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            Haptics.selectionAsync();
        }

        addItem({
            id: item.id,
            title: item.title,
            price: Math.round(item.price * PRICE_MULTIPLIER) // Tính giá theo hệ số[cite: 1]
        });
    };

    if (isPending) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1D4ED8" />
                <Text>Đang tải món...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{STUDENT.mssv}</Text>
                <Text>Không tải được dữ liệu món.</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                    <Text style={styles.retryText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>KTXGO</Text>
                <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlashList
                data={filteredData}
                numColumns={2} // Lưới 2 cột theo yêu cầu[cite: 1]
                estimatedItemSize={200}
                keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`} // Key theo quy định[cite: 1]
                onRefresh={refetch} // Pull-to-refresh[cite: 1]
                refreshing={isRefetching}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Detail', { id: item.id })} // Navigate sang Detail[cite: 1]
                    >
                        <View style={styles.imagePlaceholder} />
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.price}>{(Math.round(item.price * PRICE_MULTIPLIER)).toLocaleString('vi-VN')} đ</Text>

                        <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(item)}>
                            <Text style={styles.addBtnText}>+</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            {/* Hiện watermark ở dưới theo VARIANT 1 */}
            {!VARIANT.watermarkAtTop && (
                <Text style={styles.watermark}>TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFF6FF' },
    container: { flex: 1, backgroundColor: '#EFF6FF', padding: 10 },
    header: { backgroundColor: '#1D4ED8', padding: 15, borderRadius: 8, marginBottom: 10 },
    headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
    headerSubtitle: { color: '#BFDBFE', fontSize: 14 },
    searchInput: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, borderColor: '#BFDBFE', borderWidth: 1, marginBottom: 10 },
    card: { flex: 1, backgroundColor: '#FFFFFF', margin: 5, padding: 10, borderRadius: 8, elevation: 2 },
    imagePlaceholder: { height: 100, backgroundColor: '#BFDBFE', borderRadius: 8, marginBottom: 10 },
    title: { fontSize: 14, color: '#1E3A8A', fontWeight: 'bold' },
    price: { fontSize: 14, color: '#1D4ED8', marginVertical: 5 },
    addBtn: { backgroundColor: '#1D4ED8', padding: 10, borderRadius: 20, alignItems: 'center', alignSelf: 'flex-end' },
    addBtnText: { color: '#FFFFFF', fontWeight: 'bold' },
    errorText: { color: '#DC2626', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    retryBtn: { backgroundColor: '#DC2626', padding: 10, borderRadius: 8, marginTop: 15 },
    retryText: { color: '#FFFFFF', fontWeight: 'bold' },
    watermark: { textAlign: 'center', color: '#1E3A8A', fontSize: 12, fontWeight: 'bold', marginTop: 10 }
});