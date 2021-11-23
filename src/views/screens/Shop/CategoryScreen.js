import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../../consts/colors'
import CategoryList from '../../components/CategoryList'
import XText from '../../components/XText';
import useProductCategory from '../../../api/hooks/useProductCategory'
import Loading from '../../components/Loading'

const CategoryScreen = ({navigation}) => {

    const [index, setIndex] = useState(1)

    const {productCategories, getProductCategories, loading} = useProductCategory()

    useEffect(() => {
        getProductCategories();
    },[])

    return (
        <SafeAreaView style={styles.container}>

                { loading ? <Loading /> : null }

                <View style={styles.headerContainer}>
                    <XText style={styles.headerText} bold>Categories</XText>
                </View>

                <CategoryList 
                    categories={productCategories}
                    currentIndex={index}
                    onPress={ (categoryId) => navigation.navigate('Product', {categoryId})}
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

