import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ProfileScreen from "../Profile/ProfileScreen"
import VerifyScreen from "../Profile/VerifyScreen"
import HelpScreen from "../Profile/HelpScreen"
import AboutUsScreen from "../Profile/AboutUsScreen"
import AnswerScreen from "../Profile/AnswerScreen"

const Stack = createStackNavigator()

const ProfileStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} options={{ title: "", headerShown: false }}></Stack.Screen>
            <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: "", headerShown: false }}></Stack.Screen>
            <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ title: "", headerShown: false }}></Stack.Screen>
            <Stack.Screen name="AnswerScreen" component={AnswerScreen} options={{ title: "", headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )

}

export default ProfileStack