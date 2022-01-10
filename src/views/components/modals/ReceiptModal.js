import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'
import PlainHeader from '../../components/headers/PlainHeader'

const ReceiptScreen = ({visible=false, onBackPress, order}) => {

    return (
        <Modal
            visible={visible}
            animationType='fade'
            onRequestClose={() => onBackPress()}
        >
            <View style={styles.container}>

                <PlainHeader
                    title="Receipt"
                    onBackPress={() => onBackPress()}
                />


                <View style={styles.bodyContainer}>
                    <XText bold style={styles.textStyle} >Show this QR code to the collection booth</XText>
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={order.smug_id ? order.smug_id.toString() : '0'}
                            color={COLORS.primary}
                            size={200}
                        />
                    </View>
                    <XText style={styles.userID} >{'ID: '+ order.smug_id}</XText>
                    <XText>Ordered at {order.checked_out_at}</XText>
                    <XText>Total Item: {order.total_item}</XText>
                    <XText>Total Price: TP {order.total_price}</XText>
                </View>
            </View>
        </Modal>
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
