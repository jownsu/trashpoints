import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CategoryScreen from '../Shop/CategoryScreen'
import ProductScreen from "../Shop/ProductScreen"
import DetailsScreen from "../DetailsScreen";

const Stack = createStackNavigator();

const ShopScreenStack = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name={'Category'} component={CategoryScreen}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name={'Product'} component={ProductScreen}></Stack.Screen>
            <Stack.Screen name={'Details'} component={DetailsScreen}></Stack.Screen>
        </Stack.Navigator>
    )

}

export default ShopScreenStack