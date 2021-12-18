import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

import XText from './XText'
import config from '../../api/config'

const CategoryTabs = ({categories, onPress, catIndex = 0}) => {

    return (
        <View style={styles.container}>
            <FlatList 
                data={categories}
                keyExtractor={categories => categories.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity 
                            style={styles.btnContainer} 
                            activeOpacity={0.8} 
                            onPress={ () => { 
                                onPress(item.id, index)
                                } }> 
                            <View style={index == catIndex ? {...styles.category, borderBottomWidth: 1.5, borderColor: COLORS.primary} : styles.category}>
                                <Image style={styles.categoryImage} source={ { uri: item.image } }/>
                                <XText style={ index == catIndex ? {...styles.categoryName, color: COLORS.primary } : styles.categoryName } bold>{item.name}</XText>
                            </View>
                            
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default CategoryTabs

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        elevation: 1
    },
    btnContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName:{
        color: 'black',
        paddingHorizontal: 5
    },
    categoryImage:{
        height: 25,
        width: 25
    },
    category:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
