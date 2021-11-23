import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../HomeScreen'
import TrashScreen from '../Wallet/TrashScreen'
const Stack = createStackNavigator()

const HomeStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="TrashScreen" component={TrashScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default HomeStack