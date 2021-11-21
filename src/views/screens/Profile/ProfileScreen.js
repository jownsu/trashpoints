import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../../providers/AuthProvider'
import useUser from '../../../api/hooks/useUser'

import COLORS from '../../../consts/colors'
import Avatar from '../../components/Avatar'
import InfoColumn from '../../components/InfoColumn'

import XText from '../../components/XText'

import * as ImagePicker from 'expo-image-picker';
import MyModal from '../../components/Modal'

import { Ionicons, MaterialIcons, Octicons, Entypo } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'

const ProfileScreen = () => {
    //functions

    const { userInfo, getUserInfo, updateUserInfo, changePassword, updateAvatar } = useUser();

    //end of functions

    const { logout, loading } = useContext(AuthContext)

    const [emailModal, setEmailModal] = useState(false)
    const [contactNoModal, setContactNoModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [fullnameModal, setFullnameModal] = useState(false)

    useEffect(() => {
        getUserInfo()
    }, [])

    const pickImage = async () => {
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        }).then(response => {
            if (!response.cancelled) {
                    // setImage(response.uri)
                    updateAvatar(response.uri)
                }
        })
        .catch(error => {
            console.log(error)
        })
    };

    const EmailSchema = yup.object({
        email: yup.string().required("Email is required").email("Must be valid email"),
        currentPassword: yup.string().required('Please confirm your password')
    })

    const AddressSchema = yup.object({
        address: yup.string().required("Address is required"),
        currentPassword: yup.string().required('Please confirm your password')        
    })

    const ContactNoSchema = yup.object({
        contactNo: yup.string().required("Contact No is required"),
        currentPassword: yup.string().required('Please confirm your password')        
    })

    const FullnameSchema = yup.object({
        firstname: yup.string().required("Firstname is required"),
        middlename: yup.string().required("Middlename is required"),
        lastname: yup.string().required("Lastname is required"),
        currentPassword: yup.string().required('Please confirm your password')        
    })

    const ChangePasswordSchema = yup.object({
        newPassword: yup.string().required("New Password is required"),
        confirmNewPassword: yup.string().required("Confirm New Password is required"),
        currentPassword: yup.string().required('Please confirm your password')        
    })

    return (
        <ScrollView>
                { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null }

            <SafeAreaView style={styles.container}>

                <View style={styles.headerContainer}>
                    <View style={styles.avatar}>
                        <Avatar
                            imgPath = { userInfo.avatar }
                            onPress = { () => pickImage() }
                            height = { 100 }
                            width = { 100 }
                            editHeight = { 35 }
                            editWidth = { 35 }
                            iconSize = { 21 }
                        />
                    </View>

                    <View style={styles.headerInfo}>
                        <XText bold style={styles.headerName}>{userInfo.fullname}</XText>
                        <View style={styles.chipContainer}>
                            <XText style={styles.chipText}>Verified</XText>
                        </View>
                    </View>
                </View>

                <View style={styles.infoContainer}>

                    <InfoColumn
                        label={'Display Name'}
                        value={userInfo.fullname}
                        onEditPress={() => setFullnameModal(true)}
                    />
                    <InfoColumn
                        label={'Email'}
                        value={userInfo.email}
                        onEditPress={() => setEmailModal(true)}
                    />
                    <InfoColumn
                        label={'Contact Number'}
                        value={userInfo.contact_no}
                        onEditPress={() => setContactNoModal(true)}
                    />
                    <InfoColumn
                        label={'Address'}
                        value={userInfo.address}
                        onEditPress={() => setAddressModal(true) }
                    />
                    <InfoColumn
                        label={'Password'}
                        value={'********'}
                        onEditPress={() => setChangePasswordModal(true) }
                    />

                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <Ionicons style={styles.actionIcon} name="help" size={24} color="black" />
                            <XText style={styles.actionText}>Help</XText>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <Octicons style={styles.actionIcon} name="info" size={24} color="black" />
                            <XText style={styles.actionText}>About Us</XText>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <MaterialIcons style={styles.actionIcon} name="privacy-tip" size={24} color="black" />
                            <XText style={styles.actionText}>Privacy Policy</XText>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <Ionicons style={styles.actionIcon} name="settings-sharp" size={24} color="black" />
                            <XText style={styles.actionText}>Settings</XText>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn} onPress={ () => logout() }>
                        <View style={styles.actionInfo}>
                            <MaterialIcons style={styles.actionIcon} name="logout" size={24} color={COLORS.red} />
                            <XText style={styles.actionText}>Logout</XText>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>

                </View>

                {/* Modals */}

                {/* email */}
                <Formik
                    initialValues={{ email: userInfo.email, currentPassword: '' }}
                    onSubmit={(values, actions) => {
                        updateUserInfo({...userInfo, email: values.email, current_password: values.currentPassword})
                        actions.resetForm()
                        setEmailModal(false)
                    }}
                    validationSchema={EmailSchema}
                    enableReinitialize
                >
                    
                    {({ handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors }) => (
                        <MyModal
                            visible={emailModal}
                            onCancelPress={() => {
                                resetForm()
                                setEmailModal(false)
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
                                        onBlur={handleBlur('email')}
                                    />
                                    <XText style={styles.errorText}>{touched.email && errors.email}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Confirm Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.currentPassword}
                                        onChangeText={ handleChange('currentPassword') }
                                        onBlur={handleBlur('currentPassword')}
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.currentPassword && errors.currentPassword}</XText>
                                </View>
                            </View>
                        </MyModal>
                    )}
                    
                </Formik>

                {/* Address */}
                <Formik
                    initialValues={{ address: userInfo.address, currentPassword: '' }}
                    onSubmit={(values, actions) => {
                        updateUserInfo({...userInfo, address: values.address, current_password: values.currentPassword})
                        actions.resetForm()
                        setAddressModal(false)
                    }}
                    validationSchema={AddressSchema}
                    enableReinitialize
                >
                    {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (
                        <MyModal
                            visible={addressModal}
                            onCancelPress={() => { 
                                resetForm()
                                setAddressModal(false) 
                            }}
                            onSavePress={handleSubmit}
                        >
                            <View>
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Contact Number</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.address}
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                    />
                                    <XText style={styles.errorText}>{touched.address && errors.address}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Confirm Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.currentPassword}
                                        onChangeText={ handleChange('currentPassword') }
                                        onBlur={ handleBlur('currentPassword') }
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.currentPassword && errors.currentPassword}</XText>
                                </View>
                            </View>
                    </MyModal>
                    )}
                </Formik>

                {/* Contact No */}
                <Formik
                    initialValues={{ contactNo: userInfo.contact_no, currentPassword: ''}}
                    onSubmit={(values, actions) => {
                        updateUserInfo({...userInfo, contact_no: values.contactNo, current_password: values.currentPassword})
                        actions.resetForm()                         
                        setContactNoModal(false) 
                    }}
                    validationSchema={ContactNoSchema}
                    enableReinitialize
                >

                    {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (
                        <MyModal
                            visible={contactNoModal}
                            onCancelPress={() => { 
                                resetForm()
                                setContactNoModal(false) 
                            }}
                            onSavePress={handleSubmit}
                        >
                            <View>
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Contact Number</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.contactNo}
                                        onChangeText={ handleChange('contactNo') }
                                        onBlur={handleBlur('contactNo')}
                                    />
                                    <XText style={styles.errorText}>{touched.contactNo && errors.contactNo}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Confirm Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.currentPassword}
                                        onChangeText={ handleChange('currentPassword') }
                                        onBlur={handleBlur('currentPassword')}
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.currentPassword && errors.currentPassword}</XText>
                                </View>
                            </View>
                        </MyModal>
                    )}

                </Formik>

                {/* Fullname */}
                <Formik
                    initialValues={{ 
                        firstname: userInfo.firstname, 
                        middlename: userInfo.middlename, 
                        lastname: userInfo.lastname, 
                        currentPassword: ''
                    }}
                    onSubmit={(values, actions) => {
                        updateUserInfo({...userInfo, 
                                            firstname: values.firstname, 
                                            middlename: values.middlename, 
                                            lastname: values.lastname, 
                                            current_password: values.currentPassword})
                        actions.resetForm()
                        setFullnameModal(false) 
                    }}
                    validationSchema={FullnameSchema}
                    enableReinitialize
                >
                    {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (
                        <MyModal
                            visible={fullnameModal}
                            onCancelPress={() => { 
                                resetForm()
                                setFullnameModal(false) 
                            }}
                            onSavePress={handleSubmit}
                        >
                            <View>
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Firstname</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.firstname}
                                        onChangeText={handleChange('firstname')}
                                        onBlur={handleBlur('firstname')}
                                    />
                                    <XText style={styles.errorText}>{touched.firstname && errors.firstname}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Middlename</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.middlename}
                                        onChangeText={handleChange('middlename')}
                                        onBlur={handleBlur('middlename')}
                                    />
                                    <XText style={styles.errorText}>{touched.middlename && errors.middlename}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Lastname</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.lastname}
                                        onChangeText={handleChange('lastname')}
                                        onBlur={handleBlur('lastname')}
                                    />
                                    <XText style={styles.errorText}>{touched.lastname && errors.lastname}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Confirm Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.currentPassword}
                                        onChangeText={ handleChange('currentPassword') }
                                        onBlur={handleBlur('currentPassword')}
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.currentPassword && errors.currentPassword}</XText>
                                </View>
                            </View>
                        </MyModal>
                    )}

                </Formik>
                
                {/* Change Password */}
                <Formik
                    initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
                    onSubmit={(values, actions) => {
                        changePassword({ current_password: values.currentPassword, 
                                         new_password: values.newPassword, 
                                         new_password_confirmation: values.confirmNewPassword
                                        });
                        actions.resetForm()
                        setChangePasswordModal(false) 
                    }}
                    validationSchema={ChangePasswordSchema}
                >

                    {({handleChange, handleSubmit, handleBlur, values, resetForm, touched, errors}) => (
                        <MyModal
                            visible={changePasswordModal}
                            onCancelPress={() => { 
                                resetForm()
                                setChangePasswordModal(false) 
                            }}
                            onSavePress={handleSubmit}
                        >
                            <View>
                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Current Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.currentPassword}
                                        onChangeText={handleChange('currentPassword')}
                                        onBlur={handleBlur('currentPassword')}
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.currentPassword && errors.currentPassword}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>New Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.newPassword}
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={handleBlur('newPassword')}
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.newPassword && errors.newPassword}</XText>
                                </View>

                                <View style={styles.modalInputContainer}>
                                    <View style={styles.modalInfoLabel}>
                                        <XText>Confirm New Password</XText>
                                    </View>
                                    <TextInput
                                        style={styles.modalInfoVal}
                                        value={values.confirmNewPassword}
                                        onChangeText={handleChange('confirmNewPassword')}
                                        onBlur={handleBlur('confimNewPassword')}
                                        secureTextEntry
                                    />
                                    <XText style={styles.errorText}>{touched.confirmNewPassword && errors.confirmNewPassword}</XText>
                                </View>
                            </View>
                        </MyModal>
                    )}
                   
                </Formik>

            </SafeAreaView>
        </ScrollView>
    )

}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 120,
    },
    avatar:{
        marginRight: 10,
    },
    headerName:{
        fontSize: 18,
        color: COLORS.white
    },
    chipContainer:{
        borderWidth: 1,
        borderColor: COLORS.white,
        width: 75,
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
        marginVertical: 10,
    },
    chipText:{
        color: COLORS.white
    },
    infoContainer:{
        backgroundColor: COLORS.light,
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        elevation: 7,
        marginHorizontal: 20,
    },
    actionContainer:{

    },
    actionBtn: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
        paddingVertical: 10
    },
    actionInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
    },
    actionText:{
        flex: 2
    },
    actionIcon:{
        flex: 1
    },
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
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    },
    errorText:{
        color: COLORS.red,
        fontSize: 14
    }
})
