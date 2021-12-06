import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'

import COLORS from '../../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ItemCards from '../../components/ItemCards'
import Header from '../../components/Header'

import useProduct from '../../../api/hooks/useProduct'
import useCart from '../../../api/hooks/useCart'
import Loading from '../../components/Loading'
import XText from '../../components/XText'
import { useToast } from 'react-native-toast-notifications'
import { Searchbar } from 'react-native-paper';



const ProductScreen = ({route, navigation}) => {
    let {categoryId} = route.params
    let {categoryName} = route.params
    const { products, getProduct, searchProduct, loading } = useProduct(categoryId);
    const {addToCart} = useCart();
    const toast = useToast()

    const [search, setSearch] = useState('');

    const [quantity, setQuantity] = useState(1)

    useEffect(()=>{
        getProduct()
    },[])

    return (
        <SafeAreaView style={styles.container}>

            { loading ? <Loading /> : null }

            <Header 
                title={categoryName}
                onBackPress={() => navigation.pop()}
            />

            <Searchbar
                placeholder="Search"
                onChangeText={setSearch}
                value={search}
                onSubmitEditing={() => {searchProduct(search)}}
                onIconPress={() => {searchProduct(search)}}
                onEndEditing={() => {
                    if(search == ''){
                        getProduct()
                    }
                }}
            />


            <ItemCards 
                items={products}
                addToCartOnPress={(product_id) => {
                    addToCart({product_id: product_id, quantity: 1})
                    toast.show('Added to cart',{type: 'success'})
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
    },
    quantityContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    quantityCount: {
        fontSize: 16,
    },
    quantityBtn:{
        borderRadius: 20,
        padding: 5
    },
    quantityController: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
    },
})

