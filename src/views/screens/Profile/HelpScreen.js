import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import XText from '../../components/XText'
import COLORS from '../../../consts/colors'
import Header from '../../components/headers/Header'

import { FontAwesome5  } from '@expo/vector-icons'

const HelpScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header 
                title={'Help'}
                onBackPress={() => navigation.pop()}
            />
            <ScrollView style={styles.faqContainer}>
                <XText bold style={styles.title}>FAQs</XText>

                <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9} onPress={() => navigation.navigate('AnswerScreen', {qID: 1})}>
                    <XText style={styles.cardQuestion}>What is TrashPoints?</XText>
                    <FontAwesome5 name="chevron-right" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9} onPress={() => navigation.navigate('AnswerScreen', {qID: 2})}>
                    <XText style={styles.cardQuestion}>How to earn a points?</XText>
                    <FontAwesome5 name="chevron-right" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9} onPress={() => navigation.navigate('AnswerScreen', {qID: 3})}>
                    <XText style={styles.cardQuestion}>How to redeem rewards?</XText>
                    <FontAwesome5 name="chevron-right" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9} onPress={() => navigation.navigate('AnswerScreen', {qID: 4})}>
                    <XText style={styles.cardQuestion}>What types of Trash are acceptable?</XText>
                    <FontAwesome5 name="chevron-right" size={24} color={COLORS.primary} />
                </TouchableOpacity>

            </ScrollView>


        </SafeAreaView>
    )
}

export default HelpScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        fontSize: 32,
        color: COLORS.primary,
        marginVertical: 15
    },
    faqContainer:{
        paddingHorizontal: 10
    },
    cardContainer:{
        borderWidth:1,
        borderColor: COLORS.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        elevation: 5,
        marginBottom: 15
    },
    cardQuestion:{
        fontSize: 16
    }
})
