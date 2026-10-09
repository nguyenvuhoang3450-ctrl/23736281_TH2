import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { STUDENT, VARIANT, examStamp } from '../constants/student';
import { useAuthStore } from '../stores/authStore';

export default function LoginScreen() {
    const [inputValue, setInputValue] = useState('');
    const login = useAuthStore(state => state.login);

    const handleLogin = () => {
        if (!inputValue.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập thông tin');
            return;
        }
        login(STUDENT.mssv, examStamp());
    };

    return (
        <View style={styles.container}>
            {!VARIANT.watermarkAtTop && <WatermarkBottom />} {/* Watermark sẽ nằm ở dưới theo số 1 */}

            <Text style={styles.logo}>KTXGO</Text>
            <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

            <TextInput
                style={styles.input}
                placeholder={`Phone — ${STUDENT.mssv}`} // Theo variant authField là phone
                keyboardType="phone-pad"
                value={inputValue}
                onChangeText={setInputValue}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Vào cửa hàng</Text>
            </TouchableOpacity>

            <Text style={styles.hint}>Auth Stack · chưa có token</Text>
        </View>
    );
}

const WatermarkBottom = () => (
    <Text style={styles.watermark}>TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}</Text>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', padding: 20 },
    logo: { fontSize: 40, fontWeight: 'bold', color: '#1D4ED8', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#64748B', marginBottom: 40 },
    input: { width: '100%', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, borderColor: '#BFDBFE', borderWidth: 1, marginBottom: 20 },
    button: { width: '100%', backgroundColor: '#1D4ED8', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
    hint: { marginTop: 20, color: '#64748B' },
    watermark: { position: 'absolute', bottom: 20, color: '#1E3A8A', fontSize: 12, fontWeight: 'bold' }
});