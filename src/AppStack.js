import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/screens/HomeScreen'
import BottomNavigator from './views/navigations/BottomNavigator';
import CartScreen from './views/screens/CartScreen';
import DetailsScreen from './views/screens/DetailsScreen';
import OnBoardScreen from './views/screens/OnBoardScreen';
import SigninScreen from './views/screens/Auth/SigninScreen';
import SignupScreen from './views/screens/Auth/SignupScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    
    return (
        <Stack.Navigator>
            {/* <Stack.Screen  options={{ headerShown: false }} name={'Signin'} component={SigninScreen}></Stack.Screen> */}
            {/* <Stack.Screen  options={{ headerShown: false }} name={'Signup'} component={SignupScreen}></Stack.Screen> */}
            {/* <Stack.Screen  options={{ headerShown: false }} name={'OnBoard'} component={OnBoardScreen}></Stack.Screen> */}
            <Stack.Screen  options={{ headerShown: false }} name={'Home'} component={BottomNavigator}></Stack.Screen> 
            {/* <Stack.Screen name={'Cart'} component={CartScreen}></Stack.Screen> */}
            <Stack.Screen name={'Details'} component={DetailsScreen}></Stack.Screen>
        </Stack.Navigator>
    )

}

export default AppStack
