import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import các component tương ứng...

const Tab = createBottomTabNavigator();
export default function MainTabs() {
    // Logic đếm số lượng...
    return (
        <Tab.Navigator>
            <Tab.Screen name="Cửa hàng" component={ShopStack} />
            <Tab.Screen name="Giỏ" component={CartScreen} />
            <Tab.Screen name="Tôi" component={MeScreen} />
        </Tab.Navigator>
    );
}