import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import COLORS from '../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import 'react-native-gesture-handler'

import CartScreen from '../screens/CartScreen'
import WalletScreen from '../screens/WalletScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import ProfileScreen from '../screens/ProfileScreen'

import HomeScreenStack from '../screens/Stacks/HomeScreenStack'



const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
            <Tab.Navigator 
                screenOptions={{
                    tabBarStyle: styles.tabBarStyle,
                    headerShown: false, 
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: COLORS.primary
                }}
            >
                <Tab.Screen 
                    name={'Shop'} 
                    component={HomeScreenStack}
                    options={{ tabBarIcon: ({color}) => <Icon name="home-filled" color={color} size={28} /> }}
                />
                
                <Tab.Screen 
                    name={'Favorite'} 
                    component={FavoriteScreen}
                    options={{ tabBarIcon: ({color}) => <Icon name="favorite" color={color} size={28} /> }}
                />
                <Tab.Screen 
                    name={'Wallet'} 
                    component={WalletScreen}
                    options={{ tabBarIcon: ({color}) => (
                                <View style={styles.searchIcon}>
                                    <AntDesign name="wallet" size={28} color={color} />
                                </View>
                            ) 
                        }}
                />
                <Tab.Screen 
                    name={'Cart'} 
                    component={CartScreen}
                    options={{ tabBarIcon: ({color}) => <Icon name="shopping-cart" color={color} size={28} /> }}
                />
                <Tab.Screen 
                    name={'Profile'}
                    component={ProfileScreen}
                    options={{ tabBarIcon: ({color}) => <FontAwesome name="user" size={28} color={color} /> }}
                />
            </Tab.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    searchIcon: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        top: -15,
        backgroundColor: COLORS.white,
        elevation: 5
    },
    tabBarStyle:{
        borderTopWidth: 0,
        height: 55,
        elevation: 0,
    }
})