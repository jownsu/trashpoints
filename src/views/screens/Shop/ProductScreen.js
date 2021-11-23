import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ToastAndroid, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'

import COLORS from '../../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ItemCards from '../../components/ItemCards'

import useProduct from '../../../api/hooks/useProduct'
import useCart from '../../../api/hooks/useCart'
import Loading from '../../components/Loading'
import XText from '../../components/XText'
import { useToast } from 'react-native-toast-notifications'

import RBSheet from "react-native-raw-bottom-sheet";

const ProductScreen = ({route, navigation}) => {
    let {categoryId} = route.params
    const { products, getProduct, searchProduct, loading } = useProduct(categoryId);
    const {addToCart} = useCart();
    const toast = useToast()

    const [search, setSearch] = useState('');
    const refRBSheet = useRef();

    const [quantity, setQuantity] = useState(1)

    useEffect(()=>{
        getProduct()
    },[])

    return (
        <SafeAreaView style={styles.container}>

            { loading ? <Loading /> : null }

            <View style={styles.searchContainer}>
                <View style={styles.inputSearch}>
                    <Icon name="search" size={28} color={COLORS.dark} style={styles.searchIcon}/>
                    <TextInput 
                        placeholder={'Search...'}
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={() => {searchProduct(search)}}
                    />
                </View>

                <TouchableOpacity style={styles.filterIcon} onPress={() => { searchProduct(search) }}>
                    <Icon 
                        name="tune"
                        size={28}
                        color={COLORS.white}
                    />
                </TouchableOpacity>

            </View>

            <ItemCards 
                items={products}
                addToCartOnPress={(product_id) => {
                    addToCart({product_id: product_id, quantity: 1})
                    toast.show('Added to cart',{type: 'success'})
                }}
            />
      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={125}
        animationType={'slide'}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            backgroundColor: COLORS.light,
            paddingHorizontal: 20,
            paddingVertical: 10
          }
        }}
      >
            <View style={styles.quantityContainer}>
                <View style={styles.quantityController}>
                    <TouchableOpacity style={{ ...styles.quantityBtn, borderWidth: 1, borderColor: COLORS.primary }} onPress={() => {setQuantity(quantity - 1)}}>
                        <AntDesign name="minus" size={12} color="#000" />
                    </TouchableOpacity>
                        <TextInput 
                            value={quantity.toString()}
                            onChangeText={(text) => { setQuantity(text) }}
                            keyboardType='numeric'
                            textAlign='center'
                            style={styles.quantityCount}
                        />
                    <TouchableOpacity style={{...styles.quantityBtn, backgroundColor: COLORS.primary }} onPress={() => {setQuantity(quantity + 1)}}>
                        <AntDesign name="plus" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
      </RBSheet> */}
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

