import React, {useState} from 'react'
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import COLORS from '../../../consts/colors'
import XText from '../XText'
import { TextInput } from 'react-native-paper';
import MyModal from '../modals/MyModal'

import { Formik } from 'formik'
import * as yup from 'yup'


const OrderItem = ({orders, onAddPress, onMinusPress,onEditPress,  onDeletePress, onCardPress}) => {

    const [isRender, setIsRender] = useState(false)
    const [visible, setVisible] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [item, setItem] = useState({})

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleAddPress = (item, quantity) => {
        onAddPress(item, quantity)
        setIsRender(!isRender);
    }

    const handleMinusPress = (item, quantity) => {
        onMinusPress(item, quantity)
        setIsRender(!isRender)
    }
    
    const handleEditPress = (item, quantity) => {
        onEditPress(item, quantity)
        setIsRender(!isRender)
    }

    const handleDeletePress = item => {
        onDeletePress(item)
        setIsRender(!isRender)
    }

    const handleCardPress = item => {
        onCardPress(item)
    }

    const quantitySchema = yup.object({
        quantity: yup.number()
                    .typeError('Quantity must be a number')
                    .min(1, 'Quantity cannot be less than 1')
                    .required('Quantity is required')
    })

    return (
        <View>
            <FlatList 
                data={orders}
                keyExtractor={order => order.id.toString()}
                extraData={isRender}
                renderItem={({item}) => {
                    return (
                        <View style={styles.orderContainer}>
                            <TouchableOpacity style={styles.imgContainer} onPress={() => handleCardPress(item.products)}>
                                <Image style={styles.orderImage} source={{ uri: item.products.image }} />
                            </TouchableOpacity>
                            <View style={styles.orderDetailsContainer}>
                                <View style={styles.orderDetails}>
                                    <XText style={styles.orderName} bold numberOfLines={2}>{item.products.name}</XText>
                                </View>
                                <XText style={styles.orderPrice} bold>TP {item.products.price}</XText>
                            </View>
                            <View style={styles.quantityContainer}>
                                <View style={styles.quantityController}>
                                    <TouchableOpacity style={{ ...styles.quantityBtn, borderWidth: 1, borderColor: COLORS.primary }} onPress={() => handleMinusPress(item, -1)}>
                                        <AntDesign name="minus" size={12} color="#000" />
                                    </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => {
                                                setQuantity(item.quantity)
                                                setItem(item)
                                                showModal()
                                            }}>
                                            <XText style={styles.quantityCount} bold>{item.quantity}</XText>
                                        </TouchableOpacity>
                                        {/* <TextInput 
                                            value={item.quantity.toString()}
                                            onSubmitEditing={(text) => {item.quantity = text}}
                                            keyboardType='numeric'
                                            textAlign='center'
                                            style={styles.quantityCount}
                                        /> */}
                                    <TouchableOpacity style={{...styles.quantityBtn, backgroundColor: COLORS.primary }} onPress={() => handleAddPress(item, 1)}>
                                        <AntDesign name="plus" size={16} color={COLORS.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <AntDesign 
                                style={styles.closeIcon} 
                                name="close" 
                                size={18} 
                                color={COLORS.red} 
                                onPress={() => handleDeletePress(item)}
                            />

                        </View>
                    )
                }}
            />

        <Formik
            initialValues={{ quantity: quantity }}
            validationSchema={quantitySchema}
            onSubmit={(values, actions) => {
                handleEditPress(item, parseInt(values.quantity))
                setQuantity(1)
                setItem({})
                hideModal()
                actions.resetForm()
            }}
            enableReinitialize
        >

            {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (

                <MyModal 
                    visible={visible}
                    onCancelPress={() => {
                        setQuantity(1)
                        setItem({})
                        hideModal()
                    }}
                    onConfirmPress={handleSubmit}
                >
                    <View style={{ paddingVertical: 20 }}>
                        <TextInput 
                            autoFocus
                            mode='outlined'
                            value={values.quantity.toString()}
                            onChangeText={handleChange('quantity')}
                            onBlur={handleBlur('quantity')}
                            keyboardType='numeric'
                            label='Quantity'
                            outlineColor={COLORS.primary}
                            activeOutlineColor={COLORS.primary}
                        />
                        <XText style={styles.errorText}>{touched.quantity && errors.quantity}</XText>
                    </View>
                </MyModal>

            )}

        </Formik>

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
        fontSize: 14,
    },
    orderIngredients: {
        fontSize: 12,
        color: COLORS.grey
    },
    orderPrice: {
        fontSize: 16,
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
    },
    errorText:{
        color: COLORS.red,
        fontSize: 14
    }
})
