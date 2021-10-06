import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../AuthProvider'
import COLORS from '../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CategoryList from '../components/CategoryList'
import ItemCard from '../components/ItemCard'

import foods from '../../consts/foods'
import drinks from '../../consts/drinks'
import health from '../../consts/health'
import hygiene from '../../consts/hygiene'

import category from '../../consts/categories'

const HomeScreen = ({navigation}) => {

    const [index, setIndex] = useState(1)
    const [item, setItem] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setItem(foods)
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.headerTitle}>Hello, </Text>
                        <Text style={{...styles.headerTitle, fontWeight: 'bold'}}>{ `${user.firstname} ${user.lastname}` }</Text>
                    </View>
                    <Text style={styles.headerMessage}>What do you want today</Text>
                </View>
                <Image style={styles.headerImg} source={require('../../assets/person.jpg')} />
            </View>
            
            <View style={styles.searchContainer}>
                <View style={styles.inputSearch}>
                    <Icon name="search" size={28} color={COLORS.dark} style={styles.searchIcon}/>
                    <TextInput 
                        placeholder={'Search for food...'}
                    />
                </View>

                <View style={styles.filterIcon}>
                    <Icon 
                        name="tune"
                        size={28}
                        color={COLORS.white}
                    />
                </View>

            </View>

                <CategoryList 
                    categories={category}
                    currentIndex={index}
                    onPress={(id, name) => {
                        setIndex(id)
                        switch (name) {
                            case 'Foods':
                                setItem(foods)
                                break;
                            case 'Drinks':
                                setItem(drinks)
                                break;
                            case 'Hygiene':
                                setItem(hygiene)
                                break;
                            case 'Health':
                                setItem(health)
                                break;
                            default:
                                setItem(foods)
                                break;
                        }
                    }}
                />

                <ItemCard 
                    items={item}
                    onPress={(item) => {
                        navigation.navigate('Details', item)
                    }}
                />

        </SafeAreaView>
    )
}

export default HomeScreen
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginVertical: 20
    },
    textContainer:{
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 26,
        color: "black"
    },
    headerMessage: {
        fontSize: 18,
        color: COLORS.grey
    },
    headerImg: {
        borderRadius: 50,
        height: 60,
        width: 60,
    },
    searchContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    inputSearch:{
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
    },
    searchIcon:{
        marginHorizontal: 10
    },
    filterIcon: {
        height: 50,
        width: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})

const reducer = ({state, action}) => {

}
