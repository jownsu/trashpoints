import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CategoryList from '../../components/CategoryList'
import ItemCards from '../../components/ItemCards'

import foods from '../../../consts/foods'
import drinks from '../../../consts/drinks'
import health from '../../../consts/health'
import hygiene from '../../../consts/hygiene'

import category from '../../../consts/categories'

const CategoryScreen = ({navigation}) => {

    const [index, setIndex] = useState(1)
    const [item, setItem] = useState([])

    useEffect(() => {
        setItem(foods)
    },[])

    return (
        <SafeAreaView style={styles.container}>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Categories</Text>
                </View>

                <CategoryList 
                    categories={category}
                    currentIndex={index}
                    onPress={ (category) => navigation.navigate('Product', {category})}
                />

        </SafeAreaView>
    )
}

export default CategoryScreen
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    headerContainer:{
        paddingVertical: 35
    },
    headerText: {
        fontSize: 32,
        textAlign: 'center',
        color: COLORS.white
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

