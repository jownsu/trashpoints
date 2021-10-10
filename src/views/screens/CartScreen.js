import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import foods from '../../consts/foods'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'

const CartScreen = () => {

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 4 }}>
                <OrderItem 
                    orders={foods}
                />
            </View>

            <View style={styles.checkoutContainer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalPrice}>Total Price</Text>
                    <Text style={styles.price}>TP 50</Text>
                </View>

                <View style={styles.btn}>
                    <BtnPrimary 
                        title={'CHECKOUT'}
                    />
                </View>

            </View>


        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
        flex: 1,
    },
    checkoutContainer: {
        borderTopWidth: 1,
        borderColor: COLORS.grey,
        flex: 1,
        justifyContent: "space-around"
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    btn: {
        marginHorizontal: 50
    }

})
