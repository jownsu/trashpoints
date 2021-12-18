import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../../consts/colors'
import XText from '../../components/XText'

const AboutUsScreen = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={'About Us'}
                onBackPress={() => navigation.pop()}
            />

            <ScrollView style={styles.aboutContainer}>
                <XText bold style={styles.mainTitle}>About Us</XText>
                <XText style={styles.subTitle}>WHO WE ARE</XText>
                <XText style={styles.info}>
                    {`
    We are a group of students from the University of Caloocan City who are interested in developing an app for garbage segregation that will assist clean the environment while also allowing the community to receive rewards.
                    `}
                </XText>
                <View style={styles.imgContainer}>  
                    <Image style={styles.img} source={require('../../../assets/tp.png')} />
                    <XText style={styles.imgText}>TrashPoints</XText>
                </View>

                <XText bold style={styles.memberBlockTitle}>Members</XText>

                <View style={styles.membersContainer}>

                    <View style={styles.cardContainer}>
                        <Image style={styles.memberImg} source={require('../../../assets/members/digno.jpg')} />
                        <View style={styles.memberInfo}>
                            <XText bold style={styles.memberName}>Jhones Digno</XText>
                            <XText style={styles.memberRole} numberOfLines={1}>Mobile App Developer</XText>
                            <XText style={styles.memberEmail} numberOfLines={1}>jhonesdigno777@gmail.com</XText>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <Image style={styles.memberImg} source={require('../../../assets/members/velasquez.png')} />
                        <View style={styles.memberInfo}>
                            <XText bold style={styles.memberName}>Marvin Ryan Velasquez</XText>
                            <XText style={styles.memberRole} numberOfLines={1}>Mobile App Developer</XText>
                            <XText style={styles.memberEmail} numberOfLines={1}>marvinv777@gmail.com</XText>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <Image style={styles.memberImg} source={require('../../../assets/members/dionson.png')} />
                        <View style={styles.memberInfo}>
                            <XText bold style={styles.memberName}>Jerald Dionson</XText>
                            <XText style={styles.memberRole} numberOfLines={1}>Web Developer</XText>
                            <XText style={styles.memberEmail} numberOfLines={1}>dionsonjrld777@gmail.com</XText>
                        </View>
                    </View>

                    <View style={styles.cardContainer}>
                        <Image style={styles.memberImg} source={require('../../../assets/members/hiquiana.jpg')} />
                        <View style={styles.memberInfo}>
                            <XText bold style={styles.memberName}>Trash Points</XText>
                            <XText style={styles.memberRole} numberOfLines={1}>Trash Points</XText>
                            <XText style={styles.memberEmail} numberOfLines={1}>hiquiauna77@gmail.com</XText>
                        </View>
                    </View>

                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUsScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    aboutContainer:{
        paddingHorizontal: 20
    },
    mainTitle:{
        fontSize: 36,
        color: COLORS.primary
    },
    subTitle:{
        fontSize: 21,
        color: COLORS.primary
    },
    info:{
        letterSpacing: 1.5,
        fontSize: 18
    },
    imgContainer:{
        height: 200,
        width: 200,
        backgroundColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        alignSelf: 'center',
        marginBottom: 25
    },
    img:{
        resizeMode: 'cover',
        height: 100,
        width: 100
    },
    imgText:{
        fontSize: 18,
    },
    memberBlockTitle:{
        fontSize: 32,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 50
    },
    membersContainer:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent:'center',
    },
    cardContainer:{
        flexBasis: '48%',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: 2,
        marginBottom: 60,
        height: 150,
        width: 175,
        borderRadius: 9,
        elevation: 12,
        borderColor: COLORS.light,
        borderWidth: 1
    },
    memberImgContainer:{
        borderWidth: 2,
    },
    memberImg:{
        height: 100,
        width: 100,
        borderWidth: 10,
        borderRadius: 200,
        top: -50,
    },
    memberInfo:{
        alignItems: 'center',
        top: -35,
    },
    memberName:{
        color: COLORS.primary,
        fontSize: 14
    },
    memberRole:{
        fontSize: 12
    },
    memberEmail:{
        fontSize: 11
    }
})
