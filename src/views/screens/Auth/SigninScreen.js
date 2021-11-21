import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../../consts/colors'
import { AuthContext } from '../../../providers/AuthProvider'

import SigninForm from '../../components/auth/SigninForm'
import SignupForm from '../../components/auth/SignupForm'

const SigninScreen = ({navigation}) => {

    const [signinShow, setSigninShow] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, loading, setLoading } = useContext(AuthContext) 

    return (
        <SafeAreaView style={styles.container}>
            
            {/* { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null } */}

            <View style={styles.topView}>
                <Image style={styles.imageLogo} source={require('../../../assets/onboardImage.png')} />
                <View style={styles.indicatorContainer}>
                    <View style={styles.currentIndicator}></View>
                    <View style={styles.indicator}></View>
                    <View style={styles.indicator}></View>
                </View>
            </View>
                <View style={{ ...styles.bottomView, flex: signinShow ? 1 : 2.7 }}>

                    <View style={styles.formContainer}>
                        {
                            signinShow 
                                ? <SigninForm
                                    onSubmit={(values) => { 
                                         login(values.email, values.password) 
                                    }}
                                    signUpPress={() => { setSigninShow(false) }}
                                    loading={loading}
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
        paddingHorizontal: 20,
        paddingVertical: 10
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
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    }


})
