import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { useCampusLocation } from '../hooks/useCampusLocation';
import { STUDENT, VARIANT, examStamp } from '../constants/student';

export default function MeScreen() {
    const token = useAuthStore(state => state.token);
    const logout = useAuthStore(state => state.logout); // Xóa token quay về Login[cite: 1]
    const setStoreFee = useCartStore(state => state.setShippingFee);

    const { status, distanceKm, shippingFee, requestLocation, openSettings } = useCampusLocation();

    const handleGetLocation = async () => {
        const fee = await requestLocation();
        if (fee !== null) {
            setStoreFee(fee); // Đẩy phí ship vào store để bên tab Giỏ hàng nhận được[cite: 1]
        }
    };

    // Nếu người dùng từ chối cấp quyền, hiển thị nút Mở Cài đặt
    const isBlocked = status === Location.PermissionStatus.DENIED;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.subInfo}>{STUDENT.mssv} · #{examStamp()}</Text>
                <Text style={styles.subInfo}>Token: {token?.slice(0, 15)}...</Text>
            </View>

            <View style={styles.locationCard}>
                <Text style={styles.statusText}>
                    Quyền: {status === Location.PermissionStatus.GRANTED ? <Text style={styles.success}>granted</Text> :
                        status === Location.PermissionStatus.DENIED ? <Text style={styles.error}>denied</Text> : 'chưa cấp'}
                </Text>

                {distanceKm !== null && (
                    <Text style={styles.distance}>≈ {distanceKm.toFixed(2)} km tới cổng KTX</Text>
                )}

                <Text style={styles.feeLabel}>Phí ship ước tính</Text>
                <Text style={styles.feeValue}>
                    {shippingFee !== null ? `${shippingFee.toLocaleString('vi-VN')} đ` : '-- đ'}
                </Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleGetLocation}>
                <Text style={styles.primaryBtnText}>Lấy vị trí ước tính ship</Text>
            </TouchableOpacity>

            {isBlocked && (
                <TouchableOpacity style={styles.outlineBtn} onPress={openSettings}>
                    <Text style={styles.outlineBtnText}>Mở Cài đặt (blocked)</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutBtnText}>Đăng xuất</Text>
            </TouchableOpacity>

            {/* Watermark dưới cùng */}
            {!VARIANT.watermarkAtTop && (
                <Text style={styles.watermark}>TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF', padding: 15 },
    header: { backgroundColor: '#1D4ED8', padding: 15, alignItems: 'center', borderRadius: 8, marginBottom: 15 },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    infoCard: { alignItems: 'center', marginBottom: 20 },
    name: { fontSize: 20, fontWeight: 'bold', color: '#1E3A8A' },
    subInfo: { color: '#64748B', marginTop: 5 },
    locationCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 8, elevation: 1, marginBottom: 20 },
    statusText: { fontSize: 16, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 10 },
    success: { color: '#16A34A' },
    error: { color: '#DC2626' },
    distance: { color: '#64748B', marginBottom: 10 },
    feeLabel: { color: '#1E3A8A' },
    feeValue: { fontSize: 24, fontWeight: 'bold', color: '#F97316', marginTop: 5 },
    primaryBtn: { backgroundColor: '#1D4ED8', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    primaryBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    outlineBtn: { borderColor: '#1D4ED8', borderWidth: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    outlineBtnText: { color: '#1D4ED8', fontWeight: 'bold', fontSize: 16 },
    logoutBtn: { backgroundColor: '#DC2626', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    logoutBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    watermark: { textAlign: 'center', color: '#1E3A8A', fontSize: 12, fontWeight: 'bold', marginTop: 'auto', paddingBottom: 10 }
});