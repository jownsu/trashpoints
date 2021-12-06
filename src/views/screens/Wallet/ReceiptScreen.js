import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'
import { AntDesign } from '@expo/vector-icons';
import useUser from '../../../api/hooks/useUser'
import Loading from '../../components/Loading'


const ReceiptScreen = ({route , navigation}) => {

    const { userInfo, getUserInfo, loading } = useUser();
    let {order} = route.params;

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
                <Text style={styles.headerText}>Receipt</Text>
            </View>

            <View style={styles.bodyContainer}>
                <XText bold style={styles.textStyle} >Show this QR code to the collection booth</XText>
                <View style={styles.qrContainer}>
                    <QRCode
                        value={order.id.toString()}
                        color={COLORS.primary}
                        size={200}
                    />
                </View>
                <XText style={styles.userID} >{'ID: '+ order.smug_id}</XText>
                <XText>Ordered at {order.checked_out_at}</XText>
                <XText>Total Item: {order.total_item}</XText>
                <XText>Total Price: TP {order.total_price}</XText>
            </View>
        </SafeAreaView>
    )
}

export default ReceiptScreen

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
