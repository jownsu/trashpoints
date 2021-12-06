import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import useWallet from '../../../api/hooks/useWallet'
import useTransaction from '../../../api/hooks/useTransaction';
import COLORS from '../../../consts/colors'
import XText from '../../components/XText';
import Loading from '../../components/Loading';

const WalletScreen = ({navigation}) => {

    const { wallet, getWallet, loading } = useWallet()
    const { transactions, getTransactions } = useTransaction()

    useEffect(() => {
        getWallet()
        getTransactions()

        const listener = navigation.addListener('focus', () => {
            getWallet()
            getTransactions()
        });

        return listener
        
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../../assets/header.jpg')} style={{ zIndex: -10, height: '100%', width: '100%', zIndex:-4, position: 'absolute'}}/>

            { loading ? <Loading /> : null }

            <View style={styles.balanceContainer}>
                <XText style={styles.title}>My Wallet</XText>
                <XText style={styles.balance} bold={true}>TP {wallet.balance.toFixed(2)}</XText>
                <XText style={styles.label}>Current Balance</XText>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => { navigation.navigate('PendingOrderScreen') }}>
                        <MaterialIcons name="pending-actions" size={28} color={COLORS.primary} />
                        <XText style={styles.btnText}>Pending</XText>
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

                <View style={styles.redeemContainer}>
                    <XText>
                        Redeem History
                    </XText>

                        <View styles={styles.redeemCardContainer}>
                            <FlatList 
                                data={transactions}
                                keyExtractor={transactions  => transactions.id.toString()}
                                renderItem={({item}) => {
                                    return (
                                        <TouchableOpacity style={styles.redeemcard} onPress={() => { navigation.navigate('TransactionProductScreen', {transactionId: item.id} ) }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../../../assets/tp.png')} style={styles.redeemImg} />
                                                <View>
                                                    <XText>{item.transtracted_at}</XText>
                                                    <XText>Total Item: {item.total_item}</XText>
                                                    <XText>Total Price: {item.total_price}</XText>
                                                </View>
                                            </View>
                                            <View style={ styles.redeemIcon }>
                                                <Ionicons name="chevron-forward-outline" size={28} color="green"/>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            
                            />


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
        backgroundColor: COLORS.primary,
    },
    balanceContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        color: COLORS.white,
        fontSize: 26,
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
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 75,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 25,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        elevation: 7,
        borderWidth: 1,
        top: -50,

        borderColor: COLORS.light
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
    redeemContainer:{
        flex: 1,
        top: -40,
    },
    redeemcard:{
        backgroundColor: COLORS.white,
        height: 75,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.light,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    redeemImg:{
        height: 50,
        width: 50,
        marginRight: 15
    }
})
