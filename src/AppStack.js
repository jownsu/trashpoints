import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './views/navigations/BottomNavigator';
// import DetailsScreen from './views/screens/DetailsScreen';

import { OrderProvider } from './providers/OrderProvider';
const Stack = createStackNavigator();

const AppStack = () => {
    
    return (
        <OrderProvider>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name={'Home'} component={BottomNavigator}></Stack.Screen> 
                {/* <Stack.Screen name={'Details'} component={DetailsScreen}></Stack.Screen> */}
            </Stack.Navigator>
        </OrderProvider>
    )

}

export default AppStack
