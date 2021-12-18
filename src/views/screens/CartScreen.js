import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderItem from '../components/OrderItem'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'
import MyModal from '../components/MyModal'
import { Button } from 'react-native-paper'
import XText from '../components/XText'
import Loading from '../components/Loading'
import useCart from '../../api/hooks/useCart'
import ProductDetailsModal from '../components/ProductDetailsModal'

const CartScreen = ({navigation}) => {

    const {cart, getCart, addToCart, removeToCart, totalPrice, checkout, loading} = useCart();
    const [showModal, setShowModal] = useState(false)

    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [product, setProduct] = useState({})

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
                        if(cartItem.quantity > 1){
                            addToCart({product_id: cartItem.products.id, quantity})
                        }
                    }}
                    onEditPress={(cartItem, quantity) => {
                        addToCart({product_id: cartItem.products.id, quantity, new_quantity: true})
                    }}
                    onDeletePress={cartItem => {
                        removeToCart(cartItem.id)
                    }}
                    onCardPress={item => {
                        setShowDetailsModal(true)
                        setProduct(item)
                    }}
                />
            </View>

            <View style={styles.checkoutContainer}>
                <View style={styles.totalContainer}>
                    <XText style={styles.totalPrice} bold>Total Price</XText>
                    <XText style={styles.price} bold>TP {totalPrice()}</XText>
                </View>

                <View style={styles.btn}>
                    <Button mode="contained" color={COLORS.primary} 
                            onPress={ () => {
                                setShowModal(true)
                            }} >
                        <Text style={{ color: '#fff' }}>
                            Check Out
                        </Text>
                    </Button>
                </View>
            </View>

        {/* MODAL */}

        <MyModal 
            visible={showModal}
            onCancelPress={() => setShowModal(false)}
            onConfirmPress={() => {
                checkout()
                setShowModal(false)
            }}
        >
            <XText style={styles.txtModal}>Going to Checkout <XText bold>TP {totalPrice()}</XText>?</XText>
        </MyModal>

        <ProductDetailsModal 
                visible={showDetailsModal}
                onBackPress={ () => setShowDetailsModal(false)}
                product={product}
                showAddToCartBtn={false}
        />

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
    },
    txtModal:{
        paddingVertical: 30,
        paddingHorizontal: 10
    }

})
