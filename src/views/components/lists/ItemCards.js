import React from 'react'
import { StyleSheet, View, FlatList, Dimensions, Image, TouchableOpacity} from 'react-native'
import COLORS from '../../../consts/colors';
import { AntDesign } from '@expo/vector-icons';

import XText from '../XText';

const { width } = Dimensions.get('screen');
const cardWidth = (width / 2 ) - 20;

const ItemCards = ({items, addToCartOnPress, cardOnPress}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={items}
                keyExtractor={item => item.id}
                numColumns={2}
                removeClippedSubviews={true}  
                renderItem={({item}) => {
                    return (
                        <View style={styles.cardContainer}>
                            <TouchableOpacity onPress={() => {cardOnPress(item)}} style={styles.card}>
                                <Image resizeMethod='resize' style={styles.cardImage} source={{ uri: item.image }} resizeMode={'contain'} />
                                <View style={styles.cardDetails}>
                                    <XText style={styles.cardName} bold adjustsFontSizeToFit numberOfLines={3}>{item.name}</XText>
                                    <View style={styles.cardFooter}>
                                        <XText style={styles.cardPrice}>TP {item.price}</XText>
                                        <TouchableOpacity onPress={() => addToCartOnPress(item.id)}>
                                            <View style={styles.addToCartBtn}>
                                                <AntDesign style={styles.plusIcon} name="pluscircle" size={24} color={COLORS.primary} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )
                }}
            />
        </View>
    )
}

export default ItemCards

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
    },
    cardContainer:{
        minHeight: 220,
        width: cardWidth,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        marginTop: 50,
        marginBottom: 20,
        elevation: 13,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card:{
        flex: 1,
        justifyContent: 'space-between',
    },
    cardImage: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        top: -50
    },
    cardDetails:{
        justifyContent: 'space-between',
        flex: 1
    },
    cardName: {
        fontSize: 14,
    },
    cardIngredients: {
        fontSize: 12,
        color: COLORS.grey
    },
    cardPrice: {
        fontSize: 16,
    },
    plusIcon: {
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

})
