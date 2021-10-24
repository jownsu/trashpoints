import React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import COLORS from '../../../consts/colors'
import XText from '../XText'

const TrashItem = ({items}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={items}
                keyExtractor={item => item.id}
                numColumns={3}
                renderItem={({item}) => {
                    return (
                        <View style={styles.itemContainer}>
                            <View style={styles.imgContainer}>
                                <Image style={styles.img} source={item.image} />
                            </View>
                            <XText adjustsFontSizeToFit numberOfLines={1} style={styles.itemText}>{item.name}</XText>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default TrashItem

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    itemContainer:{
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: COLORS.primary,
        height: 150,
        width: 110,
        backgroundColor: COLORS.secondary,
    },
    imgContainer:{
        height: 100,
        width: 100,
    },
    img: {
        height: '100%',
        width: '100%'
    },
    itemText:{

    }

})
