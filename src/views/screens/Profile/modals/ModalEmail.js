import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'

const ModalEmail = (emailModal) => {
    return (
        <Formik
            initialValues={{ email: 'sdfds', currentPassword: '' }}
            onSubmit={(values, action) => {
                // updateUserInfo({...userInfo, email: values.email, current_password: values.currentPassword})
                action.resetForm()
            }}
            enableReinitialize
        >
            
            {({ handleChange, handleSubmit, values, resetForm}) => (
                <MyModal
                    visible={emailModal}
                    onCancelPress={() => {
                        resetForm()
                    }}
                    onSavePress={handleSubmit}
                >

                    <View>
                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Email</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={values.email}
                                onChangeText={handleChange('email')}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Confirm Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={values.currentPassword}
                                onChangeText={ handleChange('currentPassword') }
                                secureTextEntry
                            />
                        </View>
                    </View>
                </MyModal>
            )}
            
        </Formik>
    )
}

export default ModalEmail

const styles = StyleSheet.create({
    modalInfoLabel:{
        fontSize: 14
    },
    modalInfoVal:{
        fontSize: 16,
        borderBottomWidth: 1
    },
    modalInputContainer: {
        paddingVertical: 10
    },
})
