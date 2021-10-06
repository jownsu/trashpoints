import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { BtnSecondary } from '../Button'
import COLORS from '../../../consts/colors'

const SigninForm = ({ email, emailOnChange, password, passOnChange, onSubmit, signUpPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Sign In</Text>
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
                onChangeText={passOnChange}
            />
            <BtnSecondary 
                title={'Sign In'}
                onPress={onSubmit}
            />

            <TouchableOpacity style={styles.btnSignup} onPress={ signUpPress }>
                <Text style={styles.txtSignup}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SigninForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    btnSignup: {
        alignItems: 'center',
        paddingHorizontal: 2
    },
    txtSignup: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
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
