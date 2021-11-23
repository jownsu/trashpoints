import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors'

import XText from '../components/XText'
import TrashCategoryList from '../components/trashCategories/TrashCategoryList'
import useTrashCategory from '../../api/hooks/useTrashCategory'
import Loading from '../components/Loading'

const HomeScreen = ({navigation}) => {

    const {trashCategories, getTrashCategories, loading} = useTrashCategory()

    useEffect(() => {
        getTrashCategories()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            { loading ? <Loading /> : null }

            <View style={styles.header}>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.img} 
                        source={require('../../assets/onboardImage.png')}
                        resizeMode={'cover'}
                    />
                </View>
            </View>
            <XText style={styles.bodyTitle} bold >What we collect</XText>
            <TrashCategoryList 
                categories={trashCategories}
                onPress={(id, name) => {navigation.navigate('TrashScreen', {categoryId: id, categoryName: name})}}
            />

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    imgContainer:{
        height: 200,
        width: '75%',
    },
    img:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    body:{
    },
    bodyTitle:{
        fontSize: 24,
        textAlign: 'center',
        color: COLORS.primary
    },
})
