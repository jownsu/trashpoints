import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { BtnSecondary } from '../components/Button';
import COLORS from '../../consts/colors';

const DetailsScreen = ({navigation, route}) => {

    const item = route.params

    return (
        <View style={styles.container}>
            <Image style={styles.itemImage} source={item.image} />
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.iconContainer}>
                        <Feather name="heart" size={24} color={COLORS.primary} />
                    </View>
                </View>

                    <Text style={styles.itemDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Odio maiores quas voluptate libero. Tempora aut recusandae 
                        consequuntur perspiciatis et deleniti, doloremque saepe in. 
                        Ducimus ea quae, ipsa debitis qui laborum doloribus nostrum 
                    </Text>

                <View style={styles.btn}> 
                    <BtnSecondary
                        title={'Add To Cart'} 
                    />
                </View>


            </ScrollView>
        </View>
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
        marginVertical: 50,
        alignSelf: 'center'
    },
    detailsContainer: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 35,
        paddingVertical: 50,
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
    iconContainer: {
        backgroundColor: COLORS.white,
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDescription: {
        color: COLORS.white,
        letterSpacing: 1,
        lineHeight: 25
    },
    btn: {
        marginTop: 25,
        marginBottom: 75
    }
})
