import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import COLORS from '../../consts/colors'
import health from '../../consts/health';

const WalletScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.balanceContainer}>
                <Text style={styles.title}>My Wallet</Text>
                <Text style={styles.balance}>TP 20.749</Text>
                <Text style={styles.label}>Current Balance</Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.actionContainer}>
                    <View style={styles.btn}>
                        <View style={{ ...styles.btnIcon, backgroundColor: '#52b788' }}>
                            <FontAwesome name="recycle" size={21} color={COLORS.white} />
                        </View>
                        <Text>Recycle</Text>
                    </View>

                    <View style={styles.btn}>
                        <View style={{ ...styles.btnIcon, backgroundColor: '#168aad' }}>
                            <FontAwesome name="qrcode" size={21} color={COLORS.white} />
                        </View>
                        <Text>Scan QR</Text>
                    </View>

                    <View style={styles.btn}>
                        <View style={{ ...styles.btnIcon, backgroundColor: '#bc4749' }}>
                            <FontAwesome name="history" size={21} color={COLORS.white} />
                        </View>
                        <Text>Activities</Text>
                    </View>
                </View>

                <View style={styles.fillerContainer}>
                    <Text>Previous Transactions:</Text>
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
        fontSize: 21
    },
    balance: {
        marginTop: 50,
        marginBottom: 20,
        color: COLORS.white,
        fontWeight: 'bold',
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
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 7
    },
    btnIcon: {
        borderRadius: 50,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fillerContainer:{
        flex: 1,
        marginTop: 30

    },
    filler:{
        backgroundColor: COLORS.white,
        height: 50,
        marginVertical: 10,
        borderRadius: 25,
        elevation: 12
    }
})
