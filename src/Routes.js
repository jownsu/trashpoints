import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { StatusBar } from 'expo-status-bar'
import colors from './consts/colors'
import { AuthContext } from './providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'

const Routes = () => {

    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        SecureStore.getItemAsync('user')
            .then(response => {
                let user = JSON.parse(response)
                setUser(user)
            })
            .catch(error => {
                console.log(error)
            })
        //  SecureStore.deleteItemAsync('user')
    }, [])

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={colors.white} />
            {user ? <AppStack /> : <AuthStack /> }  
        </NavigationContainer>
    )
}

export default Routes
