import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView, Image } from 'react-native'
import { BtnSecondary } from '../Button'
import { TextInput } from 'react-native-paper'
import COLORS from '../../../consts/colors'
import XText from '../XText'
import { AntDesign } from '@expo/vector-icons'
import PlainHeader from '../headers/PlainHeader'
import MyModal from './MyModal'

import { useToast } from 'react-native-toast-notifications'
import { Formik } from 'formik'
import * as yup from 'yup'


function ProductDetailsModal({visible = false, onBackPress, product, onSubmitPress, showAddToCartBtn = true}) {
    const toast = useToast()

    const [modal, setModal] = useState(false)
    const quantitySchema = yup.object({
        quantity: yup.number()
                    .typeError('Quantity must be a number')
                    .min(1, 'Quantity cannot be less than 1')
                    .required('Quantity is required')
    })
    
    return (
        <Modal 
            visible={visible}
            animationType='fade'
            onRequestClose={() => onBackPress()}
        >
            <View style={styles.container}>
                <PlainHeader 
                    onBackPress={() => onBackPress()}
                />

                <View style={styles.imgContainer}>
                    <Image style={styles.itemImage}  source={ { uri: product.image } } />
                </View>

                <View style={styles.detailsContainer} >
                    <View style={styles.detailsHeader}>
                        <Text style={styles.itemName}>{product.name}</Text>

                    </View>

                    <ScrollView>
                        <Text style={styles.itemDescription}>{product.description}</Text>
                    </ScrollView>


                    <View style={styles.footer}>
                        
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceLabel}>Price</Text>
                            <Text style={styles.price}>TP {product.price}</Text>
                        </View>
                        {showAddToCartBtn 
                            ?                        
                                <View style={styles.btn}> 
                                    <BtnSecondary
                                        title={'Add To Cart'}
                                        onPress={() => {
                                            setModal(true)
                                        }} 
                                    />
                                </View>
                            : null
                        }


                    </View>
                </View>

                <Formik
                    initialValues={{ quantity: 1 }}
                    validationSchema={quantitySchema}
                    onSubmit={(values, actions) => {
                        onSubmitPress(product.id, values.quantity)
                        toast.show('Added to cart',{type: 'success'})
                        setModal(false)
                }}
                enableReinitialize
            >

                {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (

                    <MyModal 
                        visible={modal}
                        onCancelPress={() => {
                            setModal(false)
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
        </Modal>
    )
}


export default ProductDetailsModal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    },
    imgContainer:{
        flex: 1,
        zIndex: -100
    },
    itemImage:{
        alignSelf: 'center',
        height: 200,
        width: 200
    },
    detailsContainer: {
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 35,
        paddingTop: 25,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        flex: 1.8,
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25
    },
    itemName: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold'
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityAdd:{
        backgroundColor: COLORS.white,
        borderRadius: 20,
        height: 30,
        width: 30,
        justifyContent:'center',
        alignItems: 'center',
    },
    quantityMinus:{
        backgroundColor: COLORS.white,
        borderRadius: 20,
        height: 30,
        width: 30,
        justifyContent:'center',
        alignItems: 'center',
    },
    quantityCount:{
        color: COLORS.white,
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    itemDescription: {
        color: COLORS.white,
        letterSpacing: 1,
        lineHeight: 25
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    btn: {
        flex: 1
    },
    priceContainer:{
        flex: 1,
    },
    price:{
        color: COLORS.white,
        fontSize: 26,
        fontWeight: 'bold'
    },
    priceLabel:{
        color: COLORS.white
    },
    errorText:{
        color: COLORS.red,
        fontSize: 14
    }
})