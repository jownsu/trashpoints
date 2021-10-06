import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import COLORS from '../../../../consts/colors'
import { BtnSecondary } from '../../Button' 
import { Ionicons } from '@expo/vector-icons';

const SignUp2 = ({ onPressBack, firstname, firstnameOnChange, 
                    lastname, lastnameOnChange, contactNo, 
                    contactNoOnChange, address, addressOnChange, signupOnPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onPressBack}>
                    <Ionicons name="chevron-back-outline" size={42} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Sign Up</Text>
            </View>

            <TextInput 
                style={styles.txtInput}
                placeholder={'Firstname'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={firstname}
                onChangeText={firstnameOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Lastname'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={lastname}
                onChangeText={lastnameOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Contact No.'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={contactNo}
                onChangeText={contactNoOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Address'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={address}
                onChangeText={addressOnChange}
            />
            <BtnSecondary
                onPress={signupOnPress} 
                title={'Sign Up'}
            />
        </View>
    )
}

export default SignUp2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerContainer:{
        flexDirection: 'row'
    },
    txtInput: {
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 15,
        height: 50,
        color: COLORS.white,
        paddingLeft: 25,
    },
    headerText: {
        fontSize: 36,
        color: COLORS.white,
        fontWeight: 'bold',
    },
})
