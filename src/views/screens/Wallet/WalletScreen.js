import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import COLORS from '../../../consts/colors'
import health from '../../../consts/health';
import XText from '../../components/XText';

const WalletScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.balanceContainer}>
                <XText style={styles.title}>My Wallet</XText>
                <XText style={styles.balance} bold={true}>TP 20.749</XText>
                <XText style={styles.label}>Current Balance</XText>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => { navigation.navigate('TrashCategory') }}>
                        <MaterialCommunityIcons name="bottle-soda-classic-outline" size={28} color={COLORS.primary} />
                        <XText style={styles.btnText}>Categories</XText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => { navigation.navigate('Earn') }}>
                            <FontAwesome name="qrcode" size={28} color={COLORS.primary} />
                        <XText style={styles.btnText}>Earn</XText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
                        <Feather name="camera" size={28} color={COLORS.primary} />
                        <XText style={styles.btnText}>Scan</XText>
                    </TouchableOpacity>
                </View>

                <View style={styles.fillerContainer}>
                    <XText>
                        Redeem History
                    </XText>
                        <View style={styles.filler}>
                        </View>
                        <View style={styles.filler}>
                        </View>
                        <View style={styles.filler}>
                        </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    balanceContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        color: COLORS.white,
        fontSize: 21,
        fontFamily: 'Montserrat-bold',
    },
    balance: {
        marginTop: 50,
        marginBottom: 20,
        color: COLORS.white,
        fontSize: 42
    },
    label: {
        color: COLORS.white,
    },
    bottomContainer: {
        backgroundColor: '#D8F3DC',
        flex: 1,
        marginTop: 75,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 20
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 35,
    },
    btn: {
        backgroundColor: COLORS.white,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 7
    },
    btnText: {
        color: COLORS.primary,
        fontSize: 12  
    },
    fillerContainer:{
        flex: 1,
        marginTop: 30

    },
    filler:{
        backgroundColor: COLORS.white,
        height: 35,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 12
    }
})
