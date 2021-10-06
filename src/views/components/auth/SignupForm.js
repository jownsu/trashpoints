import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import COLORS from '../../../consts/colors'
import SignUp1 from './signupForms/SignUp1';
import SignUp2 from './signupForms/SignUp2'

const SignupForm = ({backOnPress}) => {
    const [showFirst, setShowFirst] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('')

    return (
        <View style={styles.container}>

            {
                showFirst
                ? <SignUp1
                    email={email}
                    emailOnChange={email => setEmail(email)}
                    password={password}
                    passwordOnChange={pass => setPassword(pass)}
                    cPassword={confirmPassword}
                    cPasswordOnChange={cPass => setConfirmPassword(cPass)}
                    onPressNext = { () => setShowFirst(false) }
                />
                : <SignUp2
                    firstname={firstname}
                    firstnameOnChange={firstname => setFirstname(firstname)}
                    lastname={lastname}
                    lastnameOnChange={lastname => setLastname(lastname)}
                    contactNo={contactNo}
                    contactNoOnChange={contactNo => setContactNo(contactNo)}
                    address={address}
                    addressOnChange={address => setAddress(address)}
                    onPressBack = { () => setShowFirst(true) }
                    signupOnPress = { () => console.log(email, firstname)}
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
    },
    txtLogin:{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
        paddingVertical: 10,
    }
})
