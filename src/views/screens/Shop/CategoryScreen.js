import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthContext } from '../../../AuthProvider'

import COLORS from '../../../consts/colors'

import CategoryList from '../../components/CategoryList'

import foods from '../../../consts/foods'

import category from '../../../consts/categories'

import TPserver from '../../../api/TPserver'

import XText from '../../components/XText';


const CategoryScreen = ({navigation}) => {

    const [index, setIndex] = useState(1)
    const [categories, setCategories] = useState([])

    const { user, loading, setLoading } = useContext(AuthContext)

    useEffect(() => {
        // setItem(foods)
        TPserver.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        getCategory();
    },[])

    const getCategory = async () => {
        setLoading(true)
        await TPserver.get('/productCategories')
            .then(response => {
                let data = response.data.data
                setCategories(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
                { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null }

                <View style={styles.headerContainer}>
                    <XText style={styles.headerText} bold>Categories</XText>
                </View>

                <CategoryList 
                    categories={categories}
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

