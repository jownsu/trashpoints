import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BtnSecondary } from '../components/Button';
import COLORS from '../../consts/colors';
import { FontAwesome } from '@expo/vector-icons';
import config from '../../api/config';
const DetailsScreen = ({navigation, route}) => {


    const item = route.params
    const [quantity, setQuantity] = useState(1);

    const { addOrder, orders } = useContext(OrderContext)

    

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.itemImage} source={{ uri: config.imgPath + '/' + item.image }} />
            <View style={styles.detailsContainer} >
                <View style={styles.detailsHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityMinus} onPress={() => {
                            if(quantity > 1){
                                setQuantity(quantity - 1)
                            }
                        }}>
                            <FontAwesome name="minus" size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                        <Text style={styles.quantityCount}>{quantity}</Text>
                        <TouchableOpacity style={styles.quantityAdd} onPress={() => setQuantity(quantity + 1)}>
                            <FontAwesome name="plus" size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.itemDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Odio maiores quas voluptate libero. Tempora aut recusandae 
                    consequuntur perspiciatis et deleniti, doloremque saepe in. 
                    Ducimus ea quae, ipsa debitis qui laborum doloribus nostrum 
                </Text>


                <View style={styles.footer}>
                    
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.price}>TP {item.price}</Text>
                    </View>
                    <View style={styles.btn}> 
                        <BtnSecondary
                            title={'Add To Cart'}
                            onPress={() => {
                                addOrder({id: item.id, quantity})
                                navigation.pop()
                            }} 
                        />
                    </View>

                </View>


            </View>
        </SafeAreaView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    },
    itemImage:{
        height: 220,
        width: 220,
        // marginVertical: 20,
        marginBottom: 30,
        alignSelf: 'center',
    },
    detailsContainer: {
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 35,
        paddingTop: 25,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        flex: 1,
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
    }
})
