import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Touchable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import COLORS from '../../consts/colors'
import XText from './XText'

const OrderItem = ({orders}) => {

    return (
        <View>
            <FlatList 
                data={orders}
                keyExtractor={order => order.id}
                renderItem={({item}) => {

                    return (
                        <View style={styles.orderContainer}>
                            <Image style={styles.orderImage} source={item.image} />
                            <View style={styles.orderDetailsContainer}>
                                <XText style={styles.orderName} bold >{item.name}</XText>
                                <XText style={styles.orderIngredients}>{item.ingredients}</XText>
                                <XText style={styles.orderPrice} bold>TP {item.price}</XText>
                            </View>
                            <View style={styles.quantityContainer}>
                                <XText style={styles.quantityCount} bold>{item.quantity}</XText>
                                <View style={styles.quantityController}>

                                    <TouchableOpacity onPress={() => alert('minus')}>
                                        <AntDesign name="minus" size={21} color={COLORS.white} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { alert('plus') }}>
                                        <AntDesign name="plus" size={21} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    orderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderRadius: 15,
        marginVertical: 15,
        padding: 10,
        marginHorizontal: 20,
        elevation: 15,
        backgroundColor: COLORS.white
    },
    orderImage: {
        height: 100,
        width: 100,
    },
    orderDetailsContainer: {
    },
    orderName: {
        fontSize: 18,
    },
    orderIngredients: {
        fontSize: 16,
        color: COLORS.grey
    },
    orderPrice: {
        fontSize: 18,
    },
    quantityContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityCount: {
        fontSize: 18,
        marginBottom: 12
    },
    quantityController: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        width: 80,
        height: 32,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 30
    }
})
