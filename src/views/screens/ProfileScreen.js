import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../AuthProvider'
import TPserver from '../../api/TPserver'

const ProfileScreen = () => {
    const { logout, user } = useContext(AuthContext)

    useEffect(() => {
        TPserver.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    }, [])

    return (
        <SafeAreaView>
            <Text>This is Profile</Text>
            <Button
                title={'Log Out'}
                onPress={() => { logout() }}
            />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
