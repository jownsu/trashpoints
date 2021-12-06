import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'
import { AntDesign } from '@expo/vector-icons';
import useUser from '../../../api/hooks/useUser'
import Loading from '../../components/Loading'
import Header from '../../components/Header'


const EarnScreen = ({navigation}) => {

    const { userInfo, getUserInfo, loading } = useUser();

    useEffect(() => {
         getUserInfo()
    }, [])    

    return (
        <SafeAreaView style={styles.container}>

            { loading ? <Loading /> : null }

            <Header 
                title={"Earn Points"}
                onBackPress={() => navigation.pop()}
            />

            <View style={styles.bodyContainer}>
                <XText bold style={styles.textStyle} >Show this QR code to the collection booth</XText>
                <View style={styles.qrContainer}>
                    <QRCode
                        value={userInfo.id.toString()}
                        color={COLORS.primary}
                        size={200}
                    />
                </View>
                <XText style={styles.userID}>{userInfo.smug_id}</XText>
            </View>
        </SafeAreaView>
    )
}

export default EarnScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    bodyContainer:{
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
