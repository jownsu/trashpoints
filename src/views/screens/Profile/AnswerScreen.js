import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../../consts/colors'
import Header from '../../components/headers/Header'
import XText from '../../components/XText'
const AnswerScreen = ({navigation, route}) => {

    const { qID } = route.params;

    const faqs = {
        1: {
            q: 'What is TrashPoints?',
            a: 'Trashpoints is a waste management mobile app that has been proposed to allow its users to earn points by dropping off recyclable materials and food waste at home in nearby garbage booths. The points collected may be exchanged for food and other rewards.'
        },
        2: {
            q: 'How to earn a points?',
            a: 'Users will deliver their garbage waste to the specified booth that implements the trashpoints system. The garbage waste will be scaled inside the booth, and the user will earn points based on how heavy their garbage is.'
        },
        3: {
            q: 'How to redeem rewards?',
            a: 'The points that the users earned can be exchanged for any product in the system. Points can only be exchanged once the users are on the booth.'
        },
        4: {
            q: 'What types of Trash are acceptable?',
            a: `Trash that are acceptable consist of the following:

        Plastics - mineral, soft drink, and oil bottle, milk tea container, shampoo, and laundry container, plastic bag, sachet, plastic container, plastic cup and plastic parcel
        
        Paper - A4 paper, carton box, magazine, newspaper, packaging box, tetra pack, and paper bag
        
        Organic/Garden Waste - fruit & vegetable peels, cores and scraps, egg shell, nut shell, coffee ground and tea bag
        
        Clothing - old cloth, blanket and sheet
        
        Metals - food can, soft drink can, aluminum, cast iron, copper wire, and steel 
        
        Glass - wine bottle, bear bottle, liquor bottle`
        },
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                title={'FAQs'}
                onBackPress={() => navigation.pop()}
            />

            <ScrollView style={styles.faqContainer}>

                <XText bold style={styles.question}>{faqs[qID].q}</XText>

                <XText style={styles.answer}>{faqs[qID].a}</XText>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AnswerScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    question:{
        fontSize: 30,
        color: COLORS.primary,
        marginVertical: 15
    },
    answer:{
        fontSize: 19
    },
    faqContainer:{
        paddingHorizontal: 20
    }
})
