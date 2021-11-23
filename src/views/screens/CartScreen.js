import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'

import XText from '../components/XText'
import Loading from '../components/Loading'
import useCart from '../../api/hooks/useCart'
const CartScreen = ({navigation}) => {

    const {cart, getCart, addToCart, removeToCart, totalPrice, checkout, loading} = useCart();

    useEffect(() => {
        getCart()

        const listener = navigation.addListener('focus', () => {
            getCart()
        })

        return listener
    }, []);

    

    return (
        <SafeAreaView style={styles.container}>
            { loading ? <Loading /> : null }

            <View style={{ flex: 4 }}>
                <OrderItem 
                    orders={cart}
                    onAddPress={(cartItem, quantity) => {
                            addToCart({product_id: cartItem.products.id, quantity})
                    }}
                    onMinusPress={(cartItem, quantity) => {
                        if(cartItem.quantity > 0){
                            addToCart({product_id: cartItem.products.id, quantity})
                        }
                        console.log();
                    }}
                    onEditPress={(cartItem, quantity) => {
                        addToCart({product_id: cartItem.products.id, quantity, new_quantity: true})
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
