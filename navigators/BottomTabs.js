
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, CartScreen, HistoryScreen, FavScreen } from '../screen'
import Icon from 'react-native-vector-icons/FontAwesome6';
const Tab = createBottomTabNavigator()
const BottomTabs = () => {

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: 'gray', position: 'absolute', borderTopWidth: 0 }
        }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Icon name={'house'} size={25} style={{ color: (focused) ? '#D17842' : '#52555A' }} />
                )
            }} />
            <Tab.Screen name='Cart' component={CartScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Icon name={'bag-shopping'} size={25} style={{ color: (focused) ? '#D17842' : '#52555A' }} />
                )
            }} />
            <Tab.Screen name='Fav' component={FavScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Icon name={'heart'} size={25} style={{ color: (focused) ? '#D17842' : '#52555A' }} />
                )
            }} />
            <Tab.Screen name='History' component={HistoryScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Icon name={'bell'} size={25} style={{ color: (focused) ? '#D17842' : '#52555A' }} />
                )
            }} />
        </Tab.Navigator>

    )
}

export default BottomTabs

