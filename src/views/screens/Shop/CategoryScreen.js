import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../../consts/colors'

import CategoryList from '../../components/CategoryList'

import foods from '../../../consts/foods'

import category from '../../../consts/categories'
import XText from '../../components/XText';


const CategoryScreen = ({navigation}) => {

    const [index, setIndex] = useState(1)
    const [item, setItem] = useState([])

    useEffect(() => {
        setItem(foods)
    },[])

    return (
        <SafeAreaView style={styles.container}>

                <View style={styles.headerContainer}>
                    <XText style={styles.headerText} bold>Categories</XText>
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

