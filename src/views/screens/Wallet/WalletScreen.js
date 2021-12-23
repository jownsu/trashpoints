import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import useWallet from '../../../api/hooks/useWallet'
import useTransaction from '../../../api/hooks/useTransaction';
import COLORS from '../../../consts/colors'
import XText from '../../components/XText';
import Loading from '../../components/Loading';
import EarnModal from '../../components/modals/EarnModal'
import WalletTabView from '../../components/WalletTabView'
import useRecycled from '../../../api/hooks/useRecycled';

const WalletScreen = ({navigation}) => {

    const { wallet, getWallet, loading } = useWallet()
    const { transactions, getTransactions } = useTransaction()
    const { recycled, getRecycled } = useRecycled()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getWallet()
        getTransactions()
        getRecycled()

        const listener = navigation.addListener('focus', () => {
            getWallet()
            getTransactions()
            getRecycled()

        });

        return listener
        
    }, [])
    return (
        <SafeAreaView style={styles.container}>

            { loading ? <Loading /> : null }

            <ImageBackground source={require('../../../assets/header.jpg')} style={styles.balanceContainer}>
                <XText style={styles.title}>Current Balance</XText>
                <XText style={styles.balance} bold={true}>TP {wallet.balance.toFixed(2)}</XText>

                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => { navigation.navigate('PendingOrderScreen') }}>
                        <MaterialIcons name="pending-actions" size={32} color={COLORS.primary} />
                        <XText style={styles.btnText}>Pending</XText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => setShowModal(true)}>
                            <FontAwesome name="qrcode" size={32} color={COLORS.primary} />
                        <XText style={styles.btnText}>Earn</XText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
                        <Feather name="camera" size={32} color={COLORS.primary} />
                        <XText style={styles.btnText}>Scan</XText>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

            <View style={styles.bottomContainer}>

                <WalletTabView 
                    redeems={transactions}
                    onRedeemCardPress={(id) => {
                        navigation.navigate('TransactionProductScreen', {transactionId: id} )
                    }}
                    recycled={recycled}
                    onRecycledCardPress={(id) => {
                        navigation.navigate('RecycledProductScreen', {recycledId: id} )
                    }}
                />

            </View>

            <EarnModal
                visible={showModal}
                onBackPress={() => setShowModal(false)}
            />
        </SafeAreaView>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    balanceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        zIndex: 10
    },
    title: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'Montserrat-bold',
    },
    balance: {
        color: COLORS.white,
        fontSize: 32
    },
    label: {
        color: COLORS.white,
    },
    bottomContainer: {
        backgroundColor: COLORS.white,
        flex: 2.5,
        marginTop: 40
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderRadius: 7,
        elevation: 7,
        borderWidth: 1,
        bottom: -40,
        borderColor: COLORS.light,
        marginHorizontal: 20
    },
    btn: {
        height: 70,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    btnText: {
        color: COLORS.primary,
        fontSize: 13  
    },
    redeemContainer:{
        flex: 1,
       marginTop: 50,
    },
    redeemcard:{
        backgroundColor: COLORS.white,
        height: 75,
        marginVertical: 5,
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