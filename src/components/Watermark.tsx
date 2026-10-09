import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { STUDENT, examStamp } from '../constants/student';

interface WatermarkProps {
    style?: ViewStyle;
}

export default function Watermark({ style }: WatermarkProps) {
    return (
        <Text style={[styles.watermark, style]}>
            TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
        </Text>
    );
}

const styles = StyleSheet.create({
    watermark: {
        textAlign: 'center',
        color: '#1E3A8A',
        fontSize: 12,
        fontWeight: 'bold',
        paddingVertical: 10,
    }
});