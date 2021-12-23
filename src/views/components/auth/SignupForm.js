import React, { useState, useReducer, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import COLORS from '../../../consts/colors'
import SignUp1 from './signupForms/SignUp1';
import SignUp2 from './signupForms/SignUp2'
import { AuthContext } from '../../../providers/AuthProvider';
import { Button, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Ionicons } from '@expo/vector-icons';

const SignupForm = ({backOnPress}) => {

    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [showSecondForm, setShowSecondForm] = useState(true)



    const { signup, loading } = useContext(AuthContext)

    const signUpSchema = yup.object({
        email: yup.string().email("Invalid Email").required("Email is required"),
        password: yup.string().required("Password is required"),
        password_confirmation: yup.string().required("Confirm Password is required"),
        firstname: yup.string().required("Firstname is required"),
        lastname: yup.string().required("Lastname is required"),
        contact_no: yup.string().required("Contact No is required"),
        address: yup.string().required("Address is required")
    })

    return (
        <View style={styles.container}>

            <Formik
                initialValues={{
                                email: '', 
                                password: '', 
                                password_confirmation: '',
                                firstname: '',
                                lastname: '',
                                contact_no: '',
                                address: ''
                             }}
                onSubmit={(values) => {
                    signup(values)
                    // actions.resetForm()
                }}
                validationSchema={signUpSchema}
            >

                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View>
                        {
                            showSecondForm
                            
                        ?

                        <View>
                            <TextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('email')}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.email && errors.email ? true : false}
                            />
                            <Text style={ styles.errorText } >{touched.email && errors.email}</Text>

                            <TextInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('password')}
                                right={<TextInput.Icon style={{ marginTop: 15 }} name="eye" color="white" onPress={() => setShowPassword(!showPassword)}/>}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.password && errors.password ? true : false}
                                secureTextEntry={showPassword}
                            />
                            <Text style={ styles.errorText } >{touched.password && errors.password}</Text>

                            <TextInput
                                label="Confirm Pasword"
                                value={values.password_confirmation}
                                onChangeText={handleChange('password_confirmation')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('password_confirmation')}
                                right={<TextInput.Icon style={{ marginTop: 15 }} name="eye" color="white" onPress={() => setShowConfirmPassword(!showConfirmPassword)}/>}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.password_confirmation && errors.password_confirmation ? true : false}
                                secureTextEntry={showConfirmPassword}
                            />
                            <Text style={ styles.errorText } >{touched.password_confirmation && errors.password_confirmation}</Text>

                            <Button mode="contained" onPress={()=> { setShowSecondForm(!showSecondForm) }} color={COLORS.white} style={{ }}>
                                Next
                            </Button>      
                        </View>
                        :
                        <View>
                            <TouchableOpacity onPress={() => { setShowSecondForm(!showSecondForm) }}>
                                <Ionicons name="chevron-back-outline" size={42} color="white" />
                            </TouchableOpacity>
                            <TextInput
                                label="Firstname"
                                value={values.firstname}
                                onChangeText={handleChange('firstname')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('firstname')}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.firstname && errors.firstname ? true : false}
                            />
                            <Text style={ styles.errorText } >{touched.firstname && errors.firstname}</Text>

                            <TextInput
                                label="Lastname"
                                value={values.lastname}
                                onChangeText={handleChange('lastname')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('lastname')}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.lastname && errors.lastname ? true : false}
                            />
                            <Text style={ styles.errorText } >{touched.lastname && errors.lastname}</Text>

                            <TextInput
                                label="Contact No"
                                value={values.contact_no}
                                onChangeText={handleChange('contact_no')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('contact_no')}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.contact_no && errors.contact_no ? true : false}
                            />
                            <Text style={ styles.errorText } >{touched.contact_no && errors.contact_no}</Text>

                            <TextInput
                                label="Address"
                                value={values.address}
                                onChangeText={handleChange('address')}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                mode='outlined'
                                style={styles.txtInput}
                                outlineColor='white'
                                activeOutlineColor="white"
                                selectionColor='blue'
                                onBlur={ handleBlur('address')}
                                theme={{ colors: { text: "white", placeholder: "white"} }}
                                error={touched.address && errors.address ? true : false}
                            />
                            <Text style={ styles.errorText } >{touched.address && errors.address}</Text>
                            <Button mode="contained" onPress={handleSubmit} color={COLORS.white} style={{ }}>
                                Sign Up
                            </Button>  
                        </View>
                        }

              
                    </View>
                )}
            </Formik>

            <Button mode="text" onPress={backOnPress} color={COLORS.white}>
                Already have an account?
            </Button>
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    container:{
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
    },
    txtInput: {
        backgroundColor: COLORS.primary,
        // height: 35,
        justifyContent: 'center'
    },
    errorText:{
        color: COLORS.red,
    }
})