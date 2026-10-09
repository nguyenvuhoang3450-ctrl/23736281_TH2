import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { STUDENT, VARIANT, examStamp } from '../constants/student';
import { useAuthStore } from '../stores/authStore';

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const login = useAuthStore(state => state.login);

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>KTXGO</Text>
            <TextInput
                style={styles.input}
                placeholder={`Phone — ${STUDENT.mssv}`}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity style={styles.button} onPress={() => phone ? login(STUDENT.mssv, examStamp()) : Alert.alert('Lỗi', 'Nhập sđt')}>
                <Text style={styles.buttonText}>Vào cửa hàng</Text>
            </TouchableOpacity>
            {!VARIANT.watermarkAtTop && <Text style={styles.watermark}>TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF', justifyContent: 'center', padding: 20 },
    logo: { fontSize: 40, fontWeight: 'bold', color: '#1D4ED8', textAlign: 'center', marginBottom: 40 },
    input: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#BFDBFE', marginBottom: 20 },
    button: { backgroundColor: '#1D4ED8', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
    watermark: { position: 'absolute', bottom: 20, alignSelf: 'center', color: '#1E3A8A', fontSize: 12, fontWeight: 'bold' }
});