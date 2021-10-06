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
            <Text>Email: {user.email}</Text>
            <Text>Firstname: {user.firstname}</Text>
            <Text>Middlename: {user.middlename}</Text>
            <Text>Lastname: {user.lastname}</Text>
            <Text>Address: {user.address}</Text>
            <Text>Contact No.: {user.contact_no}</Text>
            <Button
                title={'Log Out'}
                onPress={() => { logout() }}
            />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
