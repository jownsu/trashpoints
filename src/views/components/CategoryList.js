import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

import XText from './XText'

const CategoryList = ({categories, onPress}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={categories}
                keyExtractor={categories => categories.id}
                numColumns={3}  
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={ () => onPress(item.name) }>
                            <View style={styles.imgContainer} >
                                    <Image style={styles.categoryImage} source={item.image}/>
                            </View>
                            <XText style={styles.categoryName} bold >{item.name}</XText>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: COLORS.white
    },
    btnContainer: {
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 5,
        margin: 5,
        height: 100,
        width: 100,
        backgroundColor: COLORS.secondary,
        elevation: 7
    },
    categoryImage: {
        height: '75%',
        width: '75%',
    },
    categoryName: {
        fontSize: 14,
        color: COLORS.primary,
        textAlign: 'center'
    }
})
