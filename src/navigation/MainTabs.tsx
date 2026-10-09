import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import CartScreen from '../screens/CartScreen';
import MeScreen from '../screens/MeScreen';
import { useCartStore } from '../stores/cartStore';
import { VARIANT } from '../constants/student';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const totalQty = useCartStore(state => state.totalQuantity()); // Hiển thị số badge trên giỏ hàng[cite: 1]

    return (
        <Tab.Navigator screenOptions={{ headerTitleAlign: 'center', headerTintColor: '#1D4ED8' }}>
            {/* Thứ tự shopFirst theo VARIANT[cite: 1] */}
            {VARIANT.tabOrder === 'shopFirst' ? (
                <>
                    <Tab.Screen name="Cửa hàng" component={ShopStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Giỏ" component={CartScreen} options={{ tabBarBadge: totalQty > 0 ? totalQty : undefined }} />
                </>
            ) : (
                <>
                    <Tab.Screen name="Giỏ" component={CartScreen} options={{ tabBarBadge: totalQty > 0 ? totalQty : undefined }} />
                    <Tab.Screen name="Cửa hàng" component={ShopStack} options={{ headerShown: false }} />
                </>
            )}
            <Tab.Screen name="Tôi" component={MeScreen} />
        </Tab.Navigator>
    );
}