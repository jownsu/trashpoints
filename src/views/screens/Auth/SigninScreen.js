import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../../consts/colors'
import { BtnSecondary } from '../../components/Button'
import { AuthContext } from '../../../AuthProvider'

import SigninForm from '../../components/auth/SigninForm'
import SignupForm from '../../components/auth/SignupForm'

const SigninScreen = ({navigation}) => {

    const [signinShow, setSigninShow] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useContext(AuthContext) 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                <Image style={styles.imageLogo} source={require('../../../assets/onboardImage.png')} />
                <View style={styles.indicatorContainer}>
                    <View style={styles.currentIndicator}></View>
                    <View style={styles.indicator}></View>
                    <View style={styles.indicator}></View>
                </View>
            </View>

            <View style={{ ...styles.bottomView, flex: signinShow ? 1 : 1.5 }}>

                <View style={styles.formContainer}>
                    {
                        signinShow 
                            ? <SigninForm
                                email={email}
                                emailOnChange={email => setEmail(email)}
                                password={password}
                                passOnChange={pass => setPassword(pass)}
                                onSubmit={() => { login(email, password) }}
                                signUpPress={() => { setSigninShow(false) }}
                            />
                            : <SignupForm
                                backOnPress={() => { setSigninShow(true) }}
                            />
                    }


                </View>
            </View>
        </SafeAreaView>
    )
}

export default SigninScreen

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
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20,
    },
    formContainer: {
        flex: 1,
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
