import React, { useState } from "react";
import api from '../api/api'
import * as SecureStore from 'expo-secure-store'

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const AuthFunctions = {
        user,
        setUser,
        error,
        loading,
        setLoading,
        login: async (email, password) => {
            setLoading(true)

            await api().post('/login', {
                email,
                password
            }).then(response => {
                    const userData = {
                        ...response.data.data.user,
                        token: response.data.data.token
                    }
                    setUser(userData)
                    setError(null)
                    SecureStore.setItemAsync('user', JSON.stringify(userData))
                    setLoading(false)
                }).catch(error => {

                    setLoading(false)

                    if(error.message === 'Network Error'){
                        alert('No Internet Access')
                    }else{
                        const errData = error.response.data
                        setError(errData)
                        alert(errData.message)
                    }

                })
        },
        logout: async () => {
            await api().post('/logout', {})
                .then(response => {
                    SecureStore.deleteItemAsync('user')
                    setUser(null)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                })
        },
        signup: async (signUpInfo) => {
            setLoading(true)
            await api().post('/register', signUpInfo)
                .then( response => {
                    const userData = {
                        ...response.data.data.user,
                        token: response.data.data.token
                    }
                    setUser(userData)
                    setError(null)
                    SecureStore.setItemAsync('user', JSON.stringify(userData))
                    setLoading(false)
                })
                .catch( error => {
                    const errorList = []
                    let errors = error.response.data.errors
                    for (const key in errors) {
                        errorList.push(errors[key][0])                           
                    }
                    const errData = error.response.data
                    setError(errData)
                    alert(errorList.join('\n'))
                    setLoading(false)
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