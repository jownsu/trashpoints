import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ItemCards from '../../components/ItemCards'

import { AuthContext } from '../../../providers/AuthProvider'
import { OrderContext } from '../../../providers/OrderProvider'

import useProduct from '../../../api/hooks/useProduct'

const ProductScreen = ({route, navigation}) => {
    let {categoryId} = route.params
    const { orders, addOrder } = useContext(OrderContext)
    const { user, loading, setLoading } = useContext(AuthContext)

    const [ products, getProduct ] = useProduct();

    useEffect(()=>{
        getProduct(categoryId)
    },[])

    return (
        <SafeAreaView style={styles.container}>
            { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null }

            <View style={styles.searchContainer}>
                <View style={styles.inputSearch}>
                    <Icon name="search" size={28} color={COLORS.dark} style={styles.searchIcon}/>
                    <TextInput 
                        placeholder={'Search for food...'}
                    />
                </View>

                <View style={styles.filterIcon}>
                    <Icon 
                        name="tune"
                        size={28}
                        color={COLORS.white}
                    />
                </View>

            </View>

            <ItemCards 
                items={products}
                onPress={(item) => {
                    navigation.navigate('Details', item)
                    // console.log(item)
                }}
                addToCartOnPress={(id) => {
                    addOrder({id, quantity: 1})
                    ToastAndroid.show('Added to cart', ToastAndroid.SHORT)
                    // console.log({id, quantity: 1})
                }}
            />

        </SafeAreaView>
    )
}

export default ProductScreen
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    headerTitle:{
        textAlign: 'center',
        fontSize: 32,

    },
    searchContainer: {
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    inputSearch:{
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
    },
    searchIcon:{
        marginHorizontal: 10
    },
    filterIcon: {
        height: 50,
        width: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    }
})

