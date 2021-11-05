import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import foods from '../../consts/foods'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'

import XText from '../components/XText'
import TPserver from '../../api/TPserver'

import { OrderContext } from '../../providers/OrderProvider'
import { AuthContext } from '../../AuthProvider'

const CartScreen = ({navigation}) => {

    const { orders, getOrders, totalPrice } = useContext(OrderContext)
    const { user } = useContext(AuthContext)

    // const [orders, setOrders] = useState({});

    useEffect(() => {
        TPserver.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        getOrders()

        const listener = navigation.addListener('focus', () => {
            getOrders()
        })

        // console.log(orders);
        return listener
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 4 }}>
                <OrderItem 
                    orders={orders}
                />
            </View>

            <View style={styles.checkoutContainer}>
                <View style={styles.totalContainer}>
                    <XText style={styles.totalPrice} bold>Total Price</XText>
                    <XText style={styles.price} bold>TP {totalPrice()}</XText>
                </View>

                <View style={styles.btn}>
                    <BtnPrimary 
                        title={'CHECKOUT'}
                        onPress={() => console.log(orders)}
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
        paddingVertical: 10,
        justifyContent: "space-around",
        alignItems: 'center'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    totalPrice: {
        fontSize: 18,
    },
    price: {
        fontSize: 24,
    },
    btn: {
        marginVertical: 10,
        width: 250
    }

})
