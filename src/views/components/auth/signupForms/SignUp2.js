import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import COLORS from '../../../../consts/colors'
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'

const SignUp2 = ({ onPressBack, signupOnPress }) => {


    const signUp2Schema = yup.object({
        firstname: yup.string().required("Firstname is required"),
        lastname: yup.string().required("Lastname is required"),
        contactNo: yup.string().required("Contact No is required"),
        address: yup.string().required("Address is required")
    })

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onPressBack}>
                    <Ionicons name="chevron-back-outline" size={42} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Sign Up</Text>
            </View>


            <Formik
                initialValues={{ firstname: '', lastname: '', contactNo: '', address: '' }}
                onSubmit={(values, actions) => {
                    signupOnPress(values)
                    actions.resetForm()
                }}
                validationSchema={signUp2Schema}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View>
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
                            value={values.contactNo}
                            onChangeText={handleChange('contactNo')}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            mode='outlined'
                            style={styles.txtInput}
                            outlineColor='white'
                            activeOutlineColor="white"
                            selectionColor='blue'
                            onBlur={ handleBlur('contactNo')}
                            theme={{ colors: { text: "white", placeholder: "white"} }}
                            error={touched.contactNo && errors.contactNo ? true : false}
                        />
                        <Text style={ styles.errorText } >{touched.contactNo && errors.contactNo}</Text>

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
                            Sign In
                        </Button>
                    </View>
                )}





            </Formik>

            {/* <TextInput 
                style={styles.txtInput}
                placeholder={'Firstname'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={firstname}
                onChangeText={firstnameOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Lastname'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={lastname}
                onChangeText={lastnameOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Contact No.'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={contactNo}
                onChangeText={contactNoOnChange}
            />
            <TextInput 
                style={styles.txtInput}
                placeholder={'Address'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholderTextColor={COLORS.white}
                value={address}
                onChangeText={addressOnChange}
            />
            <BtnSecondary
                onPress={signupOnPress} 
                title={'Sign Up'}
            /> */}
        </View>
    )
}

export default SignUp2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerContainer:{
        flexDirection: 'row'
    },
    txtInput: {
        backgroundColor: COLORS.primary,
    },
    headerText: {
        fontSize: 36,
        color: COLORS.white,
        fontWeight: 'bold',
    },
})
