import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors'

import XText from '../components/XText'

import WeCollectCard from '../components/home/WeCollectCard'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.img} 
                        source={require('../../assets/onboardImage.png')}
                        resizeMode={'cover'}
                    />
                </View>
            </View>
            <XText style={styles.bodyTitle} bold >What we collect</XText>
            <ScrollView style={styles.body}>
                <WeCollectCard 
                    title={'Plastic'}
                    info={'Plastic waste include mineral bottle, gallon, softdrinks bottle, sachets, and other single-use plastics'}
                    img={require('../../assets/trashcans/plastic.png')}
                />
                <WeCollectCard 
                    title={'Organic'}
                    info={'Oragnic waste include green waste, food waste, food-soiled paper. non-hazardous wood waste, green waste and landscape and pruning'}
                    img={require('../../assets/trashcans/organic.png')}
                />
                <WeCollectCard 
                    title={'Paper'}
                    info={'Including white office paper, newspaper ,colored office paper, cardboard, white computer paper, magazines, catalogs, and phone books'}
                    img={require('../../assets/trashcans/paper.png')}
                />
                <WeCollectCard 
                    title={'Glass'}
                    info={'Clear and coloured glass bottles and jard of all sizes are recyclable - including beer, wind and soft-drink bottles, food and vitamin jars'}
                    img={require('../../assets/trashcans/plastic.png')}
                />
                <WeCollectCard 
                    title={'Metal'}
                    info={'Hard objects made out of metal - a can, toy, tool, or car part'}
                    img={require('../../assets/trashcans/metal.png')}
                />
            </ScrollView>


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
    },
    imgContainer:{
        height: 200,
    },
    img:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    body:{
    },
    bodyTitle:{
        fontSize: 24,
        textAlign: 'center',
        color: COLORS.primary
    },
})
