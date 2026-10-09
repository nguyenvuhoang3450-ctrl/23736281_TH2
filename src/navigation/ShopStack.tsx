import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { VARIANT } from '../constants/student';

const Stack = createNativeStackNavigator();

export default function ShopStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            {/* Theo bảng biến thể, Detail là dạng card[cite: 1] */}
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    title: 'Chi tiết món',
                    presentation: VARIANT.detailPresentation === 'modal' ? 'modal' : 'card'
                }}
            />
        </Stack.Navigator>
    );
}