import React, { useEffect } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'
import useUser from '../../../api/hooks/useUser'
import Loading from '../../components/Loading'
import PlainHeader from '../../components/headers/PlainHeader'


const EarnModal = ({visible = false, onBackPress}) => {

    const { userInfo, getUserInfo, loading } = useUser();

    useEffect(() => {
         getUserInfo()
    }, [])    

    return (
        <Modal
            visible={visible}
            animationType='fade'
            onRequestClose={() => onBackPress()}
        >
            <View style={styles.container}>

                { loading ? <Loading /> : null }

                <PlainHeader
                    onBackPress={() => onBackPress()}
                    title='Earn Points'
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
            </View>
        </Modal>
    )
}

export default EarnModal

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    bodyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 55,
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
