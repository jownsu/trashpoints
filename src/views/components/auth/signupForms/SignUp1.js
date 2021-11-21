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
        <View style={styles.container}>
            <Text style={styles.headerText}>Sign Up</Text>

            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                onSubmit={(values, actions) => {
                    onPressNext(values)
                    actions.resetForm()
                }}
                validationSchema={signUpSchema}
            >

                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
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
                            theme={{ colors: { text: "white", placeholder: "white"} }}
                            error={touched.password && errors.password ? true : false}
                        />
                        <Text style={ styles.errorText } >{touched.password && errors.password}</Text>

                        <TextInput
                            label="Confirm Pasword"
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            mode='outlined'
                            style={styles.txtInput}
                            outlineColor='white'
                            activeOutlineColor="white"
                            selectionColor='blue'
                            onBlur={ handleBlur('confirmPassword')}
                            theme={{ colors: { text: "white", placeholder: "white"} }}
                            error={touched.confirmPassword && errors.confirmPassword ? true : false}
                        />
                        <Text style={ styles.errorText } >{touched.confirmPassword && errors.confirmPassword}</Text>
                    
                        <Button mode="contained" onPress={handleSubmit} color={COLORS.white} >
                            Next
                        </Button>                    
                    </View>


                )}

                
            </Formik>

                {/* <TextInput 
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
                /> */}
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
