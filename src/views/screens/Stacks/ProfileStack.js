import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ProfileScreen from "../ProfileScreen"
import VerifyScreen from "../VerifyScreen"

const Stack = createStackNavigator()

const ProfileStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} options={{ title: "", headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )

}

export default ProfileStack