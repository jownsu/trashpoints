import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnSecondary } from '../../components/Button'
import { TextInput } from 'react-native-paper';
import COLORS from '../../../consts/colors';
import XText from '../../components/XText';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import config from '../../../api/config';
import useCart from '../../../api/hooks/useCart';
import { useToast } from 'react-native-toast-notifications'
import { Formik } from 'formik'
import MyModal from '../../components/MyModal';
import * as yup from 'yup'


const DetailsScreen = ({navigation, route}) => {


    const item = route.params
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const quantitySchema = yup.object({
        quantity: yup.number()
                    .typeError('Quantity must be a number')
                    .min(1, 'Quantity cannot be less than 1')
                    .required('Quantity is required')
    })

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <AntDesign name="back" size={38} color="black" style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.imgContainer}>
                <Image style={styles.itemImage} source={ { uri: item.image } } />
            </View>
            <View style={styles.detailsContainer} >
                <View style={styles.detailsHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>

                </View>

                <ScrollView>
                    <Text style={styles.itemDescription}>
                    {item.description}
                    </Text>
                </ScrollView>


                <View style={styles.footer}>
                    
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.price}>TP {item.price}</Text>
                    </View>
                    <View style={styles.btn}> 
                        <BtnSecondary
                            title={'Add To Cart'}
                            onPress={() => {
                                addToCart({product_id: item.id, quantity: quantity})
                                toast.show('Added to cart',{type: 'success'})
                                navigation.pop()
                            }} 
                        />
                    </View>

                </View>
            </View>

            <Formik
                initialValues={{ quantity: quantity }}
                validationSchema={quantitySchema}
                onSubmit={(values, actions) => {
                    setQuantity(parseInt(values.quantity))
                    setShowModal(false)
                    actions.resetForm()
            }}
            enableReinitialize
        >

            {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (

                <MyModal 
                    visible={showModal}
                    onCancelPress={() => {
                        setShowModal(false)
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
        </SafeAreaView>
    )
}

export default DetailsScreen

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
    },
    backIcon:{
        color: COLORS.primary,
        marginTop: 10,
        marginLeft: 10,
    }
})