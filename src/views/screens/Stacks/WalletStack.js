import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import RedeemHistoryScreen from "../Wallet/RedeemHistoryScreen"
// import TrashCategoryScreen from "../Wallet/TrashCategoryScreen"
import WalletScreen from "../Wallet/WalletScreen"
import EarnScreen from "../Wallet/EarnScreen"
import PendingOrderScreen from "../Wallet/PendingOrderScreen"
import OrderProductScreen from "../Wallet/OrderProductScreen"
import TransactionProductScreen from "../Wallet/TransactionProductScreen"
import RecycledProductScreen from "../Wallet/RecycledProductScreen"
import ReceiptScreen from "../Wallet/ReceiptScreen"

const Stack = createStackNavigator()

const WalletStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name={'WalletScreen'} component={WalletScreen} options={{ headerShown: false }}  ></Stack.Screen>
            <Stack.Screen name={'RedeemHistory'} component={RedeemHistoryScreen}></Stack.Screen>
            {/* <Stack.Screen name={'TrashCategory'} component={TrashCategoryScreen} options={{ title: 'Categories of Trash' }}></Stack.Screen> */}
            <Stack.Screen name={'Earn'} component={EarnScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'PendingOrderScreen'} component={PendingOrderScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'OrderProductScreen'} component={OrderProductScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'TransactionProductScreen'} component={TransactionProductScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'RecycledProductScreen'} component={RecycledProductScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={'ReceiptScreen'} component={ReceiptScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default WalletStack