import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BtnSecondary } from '../Button'
import COLORS from '../../../consts/colors'
import { TextInput, Button } from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'

const SigninForm = ({ onSubmit, signUpPress, loading = false }) => {
    const [hidePass, setHidePass] = useState(true)

    const signInSchema = yup.object({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required")
    })
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Sign In</Text>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onSubmit(values)
                }}
                validationSchema={signInSchema}
            >

                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View style={styles.formContainer}>
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
                            mode='outlined'
                            style={styles.txtInput}
                            outlineColor='white'
                            activeOutlineColor="white"
                            secureTextEntry={hidePass}
                            onBlur={ handleBlur('password')}
                            right={<TextInput.Icon name="eye" color="white" onPress={() => setHidePass(!hidePass)}/>}
                            theme={{ colors: { text: "white", placeholder: "white"} }}
                            error={touched.password && errors.password ? true : false}
                        />
                        <Text style={ styles.errorText } >{touched.password && errors.password}</Text>

                        {/* <BtnSecondary 
                            title={'Sign In'}
                            onPress={onSubmit}
                        /> */}
                        <Button mode="contained" onPress={handleSubmit} color={COLORS.white} loading={loading} style={{ }}>
                            Sign In
                        </Button>
                        <Button mode="text" onPress={signUpPress} color={COLORS.white} style={styles.btnSignup}>
                            Sign Up
                        </Button>
                    </View>
                )}

            </Formik>

            {/* <TouchableOpacity style={styles.btnSignup} onPress={ signUpPress }>
                <Text style={styles.txtSignup}>Sign Up</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default SigninForm

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'space-between',
        flex:1
    },
    btnSignup: {

    },
    formContainer: {
        flex:1,
        justifyContent: 'space-around'
    },
    txtSignup: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
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
