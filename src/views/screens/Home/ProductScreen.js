import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CategoryList from '../../components/CategoryList'
import ItemCards from '../../components/ItemCards'

import { OrderContext } from '../../../providers/OrderProvider' 

import foods from '../../../consts/foods'
import drinks from '../../../consts/drinks'
import health from '../../../consts/health'
import hygiene from '../../../consts/hygiene'

import category from '../../../consts/categories'

const ProductScreen = ({route, navigation}) => {

    const { addOrder, orders, addQuantity } = useContext(OrderContext)

    let {category} = route.params

    const [index, setIndex] = useState(1)
    const [item, setItem] = useState([])

    useEffect(() => {
        switch (category) {
            case 'Foods':
                setItem(foods)
                break;
            case 'Drinks':
                setItem(drinks)
                break;
            case 'Hygiene':
                setItem(hygiene)
                break;
            case 'Health':
                setItem(health)
                break;
            default:
                setItem(foods)
        }
    },[])

    return (
        <SafeAreaView style={styles.container}>
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
                    items={item}
                    onPress={(item) => {
                        navigation.navigate('Details', item)
                    }}
                    addToCartOnPress={(item) => {
                        ToastAndroid.show('Added to cart', ToastAndroid.SHORT)
                        addOrder({...item, quantity: 1})
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
    }
})

