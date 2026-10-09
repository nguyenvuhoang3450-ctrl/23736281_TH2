import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/apiClient';
import { useDebouncedValue } from '../hooks/useDebouncedValue'; // Nhớ tạo file hook này
import { STUDENT, DEBOUNCE_MS, STALE_TIME_MS, ROOM_LABEL } from '../constants/student';

export default function HomeScreen({ navigation }: any) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);

    const { data, isPending, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: async () => (await apiClient.get('/products?limit=12')).data,
        staleTime: STALE_TIME_MS,
    });

    if (isPending) return <View style={styles.center}><Text>Đang tải món...</Text></View>;

    if (isError) return (
        <View style={styles.center}>
            <Text style={{ color: '#DC2626' }}>{STUDENT.mssv}</Text>
            <Button title="Thử lại" onPress={() => refetch()} />
        </View>
    );

    const filteredData = data?.filter((item: any) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Giao tận {ROOM_LABEL}</Text>
            <TextInput
                style={styles.searchBox}
                placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                value={search}
                onChangeText={setSearch}
            />
            <FlashList
                data={filteredData}
                numColumns={2}
                estimatedItemSize={200}
                keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
                onRefresh={refetch}
                refreshing={isRefetching}
                renderItem={({ item }: { item: any }) => (
                    // Render ProductCard
                    <View />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        padding: 10,
        color: '#1D4ED8',
        fontWeight: 'bold'
    },
    searchBox: {
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderColor: '#BFDBFE',
        borderWidth: 1
    }
});