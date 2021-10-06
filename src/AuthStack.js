import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./views/screens/Auth/SigninScreen";
import SignupScreen from "./views/screens/Auth/SignupScreen";

const Stack = createStackNavigator()

const AuthStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name={"signin"} component={SigninScreen}></Stack.Screen>
            <Stack.Screen name={"signup"} component={SignupScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack





