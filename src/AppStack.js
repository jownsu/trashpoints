import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './views/navigations/BottomNavigator';

const Stack = createStackNavigator();

const AppStack = () => {
    
    return (
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name={'BottomNav'} component={BottomNavigator}></Stack.Screen> 
                {/* <Stack.Screen name={'Details'} component={DetailsScreen}></Stack.Screen> */}
            </Stack.Navigator>
    )

}

export default AppStack
