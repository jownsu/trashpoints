import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import COLORS from '../../../../consts/colors'
import { BtnSecondary } from '../../Button' 

const SignUp1 = ({ onPressNext, email, emailOnChange, password, passwordOnChange, cPassword, cPasswordOnChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Sign Up</Text>

            <TextInput 
                style={styles.txtInput}
                placeholder={'Email'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={email}
                onChangeText={emailOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Password'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                secureTextEntry={true}
                value={password}
                onChangeText={passwordOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Confirm Password'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                secureTextEntry={true}
                value={cPassword}
                onChangeText={cPasswordOnChange}
            />
            <BtnSecondary
                onPress={onPressNext}
                title={'Next'}
            />
        </View>
    )
}

export default SignUp1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
