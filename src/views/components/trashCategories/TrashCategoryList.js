import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'

import COLORS from '../../../consts/colors'

const TrashCategoryList = ({categories, onPress, currentIndex}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={categories}
                keyExtractor={category => category.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={{...styles.btnContainer, backgroundColor : item.id == currentIndex ? COLORS.primary : COLORS.secondary}} 
                                            onPress={() => onPress(item.id, item.name)}>
                            <View style={styles.imgContainer}>
                                <Image source={item.image} style={styles.img} />
                            </View>
                            <Text style={{ ...styles.btnText, color : item.id == currentIndex ? COLORS.white : COLORS.primary }} >{item.name}</Text>                
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default TrashCategoryList

const styles = StyleSheet.create({
    container:{
        marginVertical: 20
    },
    btnContainer:{
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 10,
        height: 45,
        minWidth: 120,
        marginRight: 10,
    },
    imgContainer:{
        backgroundColor: COLORS.white,
        height: 35,
        width: 35,
        borderRadius: 20,
        marginRight: 10
    },
    img:{
        height: '100%',
        width: '100%',
    },
    btnText:{
        fontSize: 14,
        fontWeight: 'bold'
    }
})
