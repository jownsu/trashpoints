import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import WalletScreen from "../Wallet/WalletScreen"
import PendingOrderScreen from "../Wallet/PendingOrderScreen"
import OrderProductScreen from "../Wallet/OrderProductScreen"
import TransactionProductScreen from "../Wallet/TransactionProductScreen"
import RecycledProductScreen from "../Wallet/RecycledProductScreen"

const Stack = createStackNavigator()

const WalletStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name={'WalletScreen'} component={WalletScreen} options={{ headerShown: false }}  ></Stack.Screen>
            <Stack.Screen name={'PendingOrderScreen'} component={PendingOrderScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'OrderProductScreen'} component={OrderProductScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'TransactionProductScreen'} component={TransactionProductScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'RecycledProductScreen'} component={RecycledProductScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default WalletStack