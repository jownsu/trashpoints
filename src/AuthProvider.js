import React, { useState } from "react";
import TPserver from './api/TPserver'
import * as SecureStore from 'expo-secure-store'

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)


    const AuthFunctions = {
        user,
        setUser,
        error,
        login: async (email, password) => {
            await TPserver.post('/login', {
                email,
                password
            }).then(response => {
                    const userData = {
                        email: response.data.data.email,
                        token: response.data.data.token
                    }

                    setUser(userData)
                    setError(null)
                    SecureStore.setItemAsync('user', JSON.stringify(userData))
                }).catch(error => {
                    const errData = error.response.data
                    setError(errData)
                    console.log(errData)
                })
        },
        logout: async () => {
            await TPserver.post('/logout', {})
                .then(response => {
                    SecureStore.deleteItemAsync('user')
                    setUser(null)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                })
        }
    }

    return(
        <AuthContext.Provider value={AuthFunctions}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }