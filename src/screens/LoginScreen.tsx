import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { STUDENT } from '../constants/student';

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const login = useAuthStore(state => state.login);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>KTXGO</Text>
            <TextInput
                style={styles.input}
                placeholder={`Số điện thoại — ${STUDENT.mssv}`}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={() => phone.trim() && login(phone)}>
                <Text style={{ color: 'white' }}>Vào cửa hàng</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFF6FF', justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, color: '#1D4ED8', textAlign: 'center', marginBottom: 40 },
    input: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8, borderColor: '#BFDBFE', borderWidth: 1, marginBottom: 20 },
    button: { backgroundColor: '#1D4ED8', padding: 15, borderRadius: 8, alignItems: 'center' }
});