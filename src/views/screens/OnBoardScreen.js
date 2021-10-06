import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors'
import { BtnPrimary } from '../components/Button'

const OnBoardScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.onboardImg} source={require('../../assets/onboardImage.png')}></Image>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>TrashPoints</Text>
                    <Text style={styles.textDescription}>Segregate your trash, We will give you points</Text>
                </View>
                <View style={styles.indicatorContainer}>
                    <View style={styles.currentIndicator}></View>
                    <View style={styles.indicator}></View>
                    <View style={styles.indicator}></View>
                </View>

                <BtnPrimary 
                    title={'Get Started'}
                    onPress={() => navigation.navigate('Home')}
                />
            </View>

        </SafeAreaView>
    )
}

export default OnBoardScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    imageContainer: {
        height: 400
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 50,
        paddingBottom: 50
    },
    textContainer: {
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textDescription: {
        fontSize: 18,
        color: COLORS.grey,
        textAlign: 'center',
        marginTop: 20
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    currentIndicator: {
        height: 12,
        width: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    indicator: {
        height: 12,
        width: 12,
        backgroundColor: COLORS.grey,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    onboardImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})
