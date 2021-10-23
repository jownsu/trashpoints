import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import RedeemHistoryScreen from "../Wallet/RedeemHistoryScreen"
import TrashCategoryScreen from "../Wallet/TrashCategoryScreen"
import WalletScreen from "../Wallet/WalletScreen"

const Stack = createStackNavigator()

const WalletStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name={'WalletScreen'} component={WalletScreen} options={{ headerShown: false }}  ></Stack.Screen>
            <Stack.Screen name={'RedeemHistory'} component={RedeemHistoryScreen}></Stack.Screen>
            <Stack.Screen name={'TrashCategory'} component={TrashCategoryScreen} options={{ title: 'Categories of Trash' }}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default WalletStack