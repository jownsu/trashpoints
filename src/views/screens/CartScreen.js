import React, {useContext, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import foods from '../../consts/foods'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'

import { OrderContext } from '../../providers/OrderProvider'
const CartScreen = () => {

    const { orders } = useContext(OrderContext)

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flex: 4 }}>
                <OrderItem 
                    orders={orders}
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
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    btn: {
        marginVertical: 10,
        width: 250
    }

})
