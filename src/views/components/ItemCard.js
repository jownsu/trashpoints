import React from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity} from 'react-native'
import COLORS from '../../consts/colors';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
const cardWidth = (width / 2 ) - 20;

const ItemCard = ({items, onPress}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={items}
                keyExtractor={item => item.id}
                numColumns={2}  
                renderItem={({item}) => {
                    return (
                        <View style={styles.cardContainer}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
                                    <Image style={styles.cardImage} source={item.image} />
                                    <Text style={styles.cardName} adjustsFontSizeToFit>{item.name}</Text>
                                    <Text style={styles.cardIngredients}>{item.ingredients}</Text>

                                    <View style={styles.cardFooter}>
                                        <Text style={styles.cardPrice}>TP {item.price}</Text>
                                        <View style={styles.addToCartBtn}>
                                            <AntDesign style={styles.plusIcon} name="pluscircle" size={32} color={COLORS.primary} />
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

export default ItemCard

const styles = StyleSheet.create({
    container:{
        flex: 1
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
        paddingBottom: 20
    },
    cardImage: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        top: -50
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardIngredients: {
        fontSize: 12,
        color: COLORS.grey
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    plusIcon: {
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

})
