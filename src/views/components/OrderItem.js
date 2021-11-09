import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Touchable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import COLORS from '../../consts/colors'
import XText from './XText'

import { OrderContext } from '../../providers/OrderProvider'

import config from '../../api/config'

const OrderItem = ({orders}) => {

    const { addOrder, removeOrder, dispatch } = useContext(OrderContext)
    

    return (
        <View>
            <FlatList 
                data={orders}
                keyExtractor={order => order.id.toString()}
                renderItem={({item}) => {
                    return (
                        <View style={styles.orderContainer}>
                            <View style={styles.imgContainer}>
                                <Image style={styles.orderImage} source={{ uri: config.imgPath + '/' + item.products.image }} />
                            </View>
                            <View style={styles.orderDetailsContainer}>
                                <View style={styles.orderDetails}>
                                    <XText style={styles.orderName} bold >{item.products.name}</XText>
                                    <XText style={styles.orderIngredients}>{item.products.description}</XText>
                                </View>
                                <XText style={styles.orderPrice} bold>TP {item.products.price}</XText>
                            </View>
                            <View style={styles.quantityContainer}>
                                <View style={styles.quantityController}>
                                    <TouchableOpacity style={{ ...styles.quantityBtn, borderWidth: 1, borderColor: COLORS.primary }} onPress={() => {
                                            if(item.quantity > 1){
                                                addOrder({id: item.products.id, quantity: -1})
                                                dispatch({type: 'addQuantity', order: {...item, quantity: -1}})
                                            }
                                        }}>
                                        <AntDesign name="minus" size={12} color="#000" />
                                    </TouchableOpacity>
                                        <XText style={styles.quantityCount} bold>{item.quantity}</XText>
                                    <TouchableOpacity style={{...styles.quantityBtn, backgroundColor: COLORS.primary }} onPress={() => {
                                                addOrder({id: item.products.id, quantity: 1})
                                                dispatch({type: 'addQuantity', order: {...item, quantity: 1}})
                                        }}>
                                        <AntDesign name="plus" size={16} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <AntDesign 
                                style={styles.closeIcon} 
                                name="close" 
                                size={18} 
                                color={COLORS.red} 
                                onPress={() => removeOrder(item)}
                            />
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
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderColor: COLORS.light
    },
    imgContainer:{
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        height: 90,
        width: 90,
        padding: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderImage: {
        height: '85%',
        width: '85%',
        resizeMode: 'contain'
    },
    orderDetailsContainer: {
        justifyContent: 'space-around',
        flex: 1,
    },
    orderDetails:{

    },
    orderName: {
        fontSize: 18,
    },
    orderIngredients: {
        fontSize: 12,
        color: COLORS.grey
    },
    orderPrice: {
        fontSize: 18,
    },
    quantityContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    quantityCount: {
        fontSize: 16,
        marginHorizontal: 10
    },
    quantityBtn:{
        borderRadius: 20,
        padding: 5
    },
    quantityController: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
    },
    closeIcon:{
        position: 'absolute',
        top: 10,
        right: 10
    }
})
