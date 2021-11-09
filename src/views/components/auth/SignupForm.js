import React, { useState, useReducer, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import COLORS from '../../../consts/colors'
import SignUp1 from './signupForms/SignUp1';
import SignUp2 from './signupForms/SignUp2'
import { AuthContext } from '../../../providers/AuthProvider';

const SignupForm = ({backOnPress}) => {

    const { signup } = useContext(AuthContext)
    const [showFirst, setShowFirst] = useState(true)

    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        password_confirmation: '',
        firstname: '',
        lastname: '',
        contact_no: '',
        address: ''
    })

    return (
        <View style={styles.container}>
            {
                showFirst
                ? <SignUp1
                    email={state.email}
                    emailOnChange={email => dispatch({field: 'email', value: email})}
                    password={state.password}
                    passwordOnChange={pass => dispatch({field: 'password', value: pass})}
                    cPassword={state.password_confirmation}
                    cPasswordOnChange={cPass => dispatch({field: 'password_confirmation', value: cPass})}
                    onPressNext = { () => setShowFirst(false) }
                />
                : <SignUp2
                    firstname={state.firstname}
                    firstnameOnChange={firstname => dispatch({field: 'firstname', value: firstname})}
                    lastname={state.lastname}
                    lastnameOnChange={lastname => dispatch({field: 'lastname', value: lastname})}
                    contactNo={state.contact_no}
                    contactNoOnChange={contact_no => dispatch({field: 'contact_no', value: contact_no})}
                    address={state.address}
                    addressOnChange={address => dispatch({field: 'address', value: address})}
                    onPressBack = { () => setShowFirst(true) }
                    signupOnPress = { () => signup(state)}
                />
            }

            <TouchableOpacity style={styles.btnLogin} onPress={backOnPress}>
                <Text style={styles.txtLogin}>Already have an account?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
    },
    btnLogin: {
        alignItems: 'center',
        paddingHorizontal: 2,
        zIndex: -20

    },
    txtLogin:{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
        paddingVertical: 10,
    }
})

const reducer = (state, action) => {
    //action = field, value

    switch (action.field) {
        case 'email':
            return {...state, email: action.value }
        case 'password':
            return {...state, password: action.value}
        case 'password_confirmation':
            return {...state, password_confirmation: action.value}
        case 'firstname':
            return {...state, firstname: action.value}
        case 'lastname':
            return {...state, lastname: action.value}
        case 'contact_no':
            return {...state, contact_no: action.value}
        case 'address':
            return {...state, address: action.value}
        default:
            return state
    }
}
