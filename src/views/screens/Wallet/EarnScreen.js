import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'
import { AntDesign } from '@expo/vector-icons';
import useUser from '../../../api/hooks/useUser'
import Loading from '../../components/Loading'


const EarnScreen = ({navigation}) => {

    const { userInfo, getUserInfo, loading } = useUser();

    useEffect(() => {
         getUserInfo()
    }, [])    

    return (
        <SafeAreaView style={styles.container}>

            { loading ? <Loading /> : null }

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backIcon} onPress={() => {navigation.pop()}}>
                    <AntDesign name="back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Earn Points</Text>
            </View>

            <View style={styles.bodyContainer}>
                <XText bold style={styles.textStyle} >Show this QR code to the collection booth</XText>
                <View style={styles.qrContainer}>
                    <QRCode
                        value={userInfo.id.toString()}
                        color={COLORS.primary}
                        size={200}
                    />
                </View>
                <XText style={styles.userID} >{'TP-'+userInfo.id}</XText>
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
    headerContainer:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        backgroundColor: COLORS.primary,
        flexDirection: 'row'
        },
      headerText:{
        textAlign: "center",
        color: "#ffffff",
        fontSize: 20,
      },
      backIcon:{
        position: 'absolute',
        left: 20
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
