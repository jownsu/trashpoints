import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../../consts/colors'
import { BtnSecondary } from '../../components/Button'
import { Ionicons } from '@expo/vector-icons';

import XText from '../../components/XText'

const SignupScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                <Image style={styles.imageLogo} source={require('../../../assets/onboardImage.png')} />
                <View style={styles.indicatorContainer}>
                    <View style={styles.indicator}></View>
                    <View style={styles.currentIndicator}></View>
                    <View style={styles.indicator}></View>
                </View>
            </View>

            <View style={styles.bottomView}>
                <View style={styles.headerContainer}>
                    <XText style={styles.headerText}>Sign Up</XText>
                </View>

                <View style={styles.formContainer}>
                    <TextInput 
                        style={styles.txtInput}
                        placeholder={'Email'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                    />
                    <TextInput 
                        style={styles.txtInput}
                        placeholder={'Password'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                        secureTextEntry={true}
                    />
                    <TextInput 
                        style={styles.txtInput}
                        placeholder={'Confirm Password'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                        secureTextEntry={true}
                    />
                    <TextInput 
                        style={styles.txtInput}
                        placeholder={'First Name'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                    />
                    <TextInput 
                        style={styles.txtInput}
                        placeholder={'Last Name'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                    />

                    <BtnSecondary 
                        title={'Sign In'}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    topView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageLogo: {
        height: 150,
        width: '80%',
        resizeMode: 'contain',
    },
    bottomView: {
        flex: 2,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20
    },
    headerText: {
        fontSize: 36,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    headerContainer:{
    },
    formContainer: {
        flex: 3,
        justifyContent: 'space-around',
    },
    txtInput: {
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 15,
        height: 40,
        color: COLORS.white,
        paddingLeft: 25,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'absolute',
        bottom: 0
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

})
