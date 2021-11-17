import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'

import XText from '../components/XText'

import { AuthContext } from '../../providers/AuthProvider'
import useCart from '../../api/hooks/useCart'
const CartScreen = ({navigation}) => {

    //const { cart, getCart } = useContext(OrderContext)
    const { user } = useContext(AuthContext)
    const {cart, getCart, addToCart, removeToCart, totalPrice, checkout} = useCart();
    // const [orders, setOrders] = useState({});

    useEffect(() => {
        getCart()

        const listener = navigation.addListener('focus', () => {
            getCart()
        })

        return listener
    }, []);

    

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 4 }}>
                <OrderItem 
                    orders={cart}
                    onAddPress={cartItem => {
                            addToCart({product_id: cartItem.products.id, quantity: 1})

                    }}
                    onMinusPress={cartItem => {
                        if(cartItem.quantity > 0){
                            addToCart({product_id: cartItem.products.id, quantity: -1})
                        }
                        console.log();
                    }}
                    onDeletePress={cartItem => {
                        removeToCart(cartItem.id)
                    }}
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
                        onPress={() => checkout()}
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
