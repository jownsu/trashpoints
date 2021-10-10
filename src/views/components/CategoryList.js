import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

const CategoryList = ({categories, currentIndex, onPress}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={categories}
                keyExtractor={categories => categories.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={ () => onPress(item.id, item.name) }>
                            <View style={{ ...styles.btnContainer, backgroundColor : item.id == currentIndex ? COLORS.primary : COLORS.secondary }} >
                                <View style={styles.imageContainer}>
                                    <Image style={styles.categoryImage} source={item.image}/>
                                </View>
                                <Text style={{ ...styles.categoryName, color : item.id == currentIndex ? COLORS.white : COLORS.primary }}>{item.name}</Text>
                            </View>
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
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 5,
        height: 35,
        minWidth: 120,
        marginLeft: 15,
    },
    imageContainer: {
        backgroundColor: COLORS.white,
        height: 25,
        width: 25,
        borderRadius: 20,
        marginRight: 10
    },
    categoryImage: {
        height: '100%',
        width: '100%',
    },
    categoryName: {
        fontSize: 14,
        fontWeight: 'bold'

    }
})
