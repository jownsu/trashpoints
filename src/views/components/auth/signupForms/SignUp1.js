import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../../../../consts/colors'
import { TextInput, Button } from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'

const SignUp1 = ({ onPressNext }) => {
    
    const signUpSchema = yup.object({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string().required("Confirm Password is required")
    })
    
    return (
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
        backgroundColor: COLORS.primary,
    },
    headerText: {
        fontSize: 36,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    errorText:{
        color: COLORS.red
    }
})
