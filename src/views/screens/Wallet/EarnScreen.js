import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'

import { AuthContext } from '../../../providers/AuthProvider'
import api from '../../../api/api'


const EarnScreen = () => {

    const [userId, setUserId] = useState(0)

    const { user, loading, setLoading } = useContext(AuthContext)

    const getMyInfo = async () => {
        setLoading(true)
        await api({token: user.token}).get('/me')
            .then(response => {
                let userInfo = response.data.data
                setUserId(userInfo.id)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
            })
    }

    useEffect(() => {
         getMyInfo()
    }, [])    

    return (
        <SafeAreaView style={styles.container}>
            { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null }

            <XText bold style={styles.textStyle} >Show this QR code to the collection booth</XText>
            <View style={styles.qrContainer}>
                <QRCode
                    value={userId.toString()}
                    color={COLORS.primary}
                    size={200}
                />
            </View>
            <XText style={styles.userID} >{'TP-'+userId}</XText>
        </SafeAreaView>
    )
}

export default EarnScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    textStyle:{
        fontSize: 16
    },
    qrContainer:{
        marginVertical: 35,
        padding: 35,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        elevation: 11
    },
    userID:{
        fontSize: 21
    },
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    }
})
