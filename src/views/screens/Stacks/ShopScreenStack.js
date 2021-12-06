import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Image, StyleSheet } from "react-native";

import CategoryScreen from '../Shop/CategoryScreen'
import ProductScreen from "../Shop/ProductScreen"

import Header from "../../components/Header";

const Stack = createStackNavigator();

const ShopScreenStack = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name={'Category'} component={CategoryScreen}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name={'Product'} component={ProductScreen}></Stack.Screen>
        </Stack.Navigator>
    )

}

export default ShopScreenStack