import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../providers/AuthProvider'
import useUser from '../../api/hooks/useUser'
import api from '../../api/api'

import COLORS from '../../consts/colors'
import Avatar from '../components/Avatar'
import InfoColumn from '../components/InfoColumn'

import XText from '../components/XText'

import * as ImagePicker from 'expo-image-picker';
import MyModal from '../components/Modal'

import { Ionicons, MaterialIcons, Octicons, Entypo } from '@expo/vector-icons'

const ProfileScreen = () => {
    //functions

    const { userInfo, getUserInfo, updateUserInfo, changePassword, updateAvatar } = useUser();

    //end of functions

    const { logout, user, loading, setLoading } = useContext(AuthContext)

    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

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
                        onEditPress={() => {
                            setFirstname(userInfo.firstname)
                            setMiddlename(userInfo.middlename)
                            setLastname(userInfo.lastname)
                            setFullnameModal(true)
                        }}
                    />
                    <InfoColumn
                        label={'Email'}
                        value={userInfo.email}
                        onEditPress={() => {
                            setEmail(userInfo.email)
                            setEmailModal(true)
                        }}
                    />
                    <InfoColumn
                        label={'Contact Number'}
                        value={userInfo.contact_no}
                        onEditPress={() => {
                            setContactNo(userInfo.contact_no)
                            setContactNoModal(true)
                        }}
                    />
                    <InfoColumn
                        label={'Address'}
                        value={userInfo.address}
                        onEditPress={() => {
                            setAddress(userInfo.address)
                            setAddressModal(true)
                        }}
                    />
                    <InfoColumn
                        label={'Password'}
                        value={'********'}
                        onEditPress={() => {
                            setChangePasswordModal(true)
                        }}
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
                <MyModal
                    visible={emailModal}
                    onCancelPress={() => {
                        setCurrentPassword('') 
                        setEmailModal(false) 
                    }}
                    onSavePress={() => { 
                        updateUserInfo({...userInfo, email, current_password: currentPassword})
                        setCurrentPassword('') 
                        setEmailModal(false)
                    }}
                >
                    <View>
                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Email</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Confirm Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={currentPassword}
                                onChangeText={ text => setCurrentPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </MyModal>

                {/* Address */}
                <MyModal
                    visible={addressModal}
                    onCancelPress={() => { 
                        setCurrentPassword('') 
                        setAddressModal(false) 
                    }}
                    onSavePress={() => { 
                        updateUserInfo({...userInfo, address, current_password: currentPassword})
                        setCurrentPassword('') 
                        setAddressModal(false) 
                    }}
                >
                    <View>
                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Contact Number</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={address}
                                onChangeText={text => setAddress(text)}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Confirm Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={currentPassword}
                                onChangeText={ text => setCurrentPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </MyModal>

                {/* Contact No */}
                <MyModal
                    visible={contactNoModal}
                    onCancelPress={() => { 
                        setCurrentPassword('') 
                        setContactNoModal(false) 
                    }}
                    onSavePress={() => { 
                        updateUserInfo({...userInfo, contact_no: contactNo, current_password: currentPassword})
                        setCurrentPassword('') 
                        setContactNoModal(false) 
                    }}
                >
                    <View>
                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Contact Number</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={contactNo}
                                onChangeText={text => setContactNo(text)}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Confirm Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={currentPassword}
                                onChangeText={ text => setCurrentPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </MyModal>

                {/* Fullname */}
                <MyModal
                    visible={fullnameModal}
                    onCancelPress={() => { 
                        setCurrentPassword('') 
                        setFullnameModal(false) 
                    }}
                    onSavePress={() => { 
                        updateUserInfo({...userInfo, firstname, middlename, lastname, current_password: currentPassword})
                        setCurrentPassword('') 
                        setFullnameModal(false) 
                    }}
                >
                    <View>
                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Firstname</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={firstname}
                                onChangeText={text => setFirstname(text)}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Middlename</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={middlename}
                                onChangeText={text => setMiddlename(text)}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Lastname</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={lastname}
                                onChangeText={text => setLastname(text)}
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Confirm Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={currentPassword}
                                onChangeText={ text => setCurrentPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </MyModal>
                
                {/* Change Password */}
                <MyModal
                    visible={changePasswordModal}
                    onCancelPress={() => { 
                        setCurrentPassword('') 
                        setChangePasswordModal(false) 
                    }}
                    onSavePress={() => { 
                        changePassword({current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmNewPassword});
                        setChangePasswordModal(false) 
                    }}
                >
                    <View>
                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Current Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={currentPassword}
                                onChangeText={text => setCurrentPassword(text)}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>New Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={newPassword}
                                onChangeText={text => setNewPassword(text)}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.modalInputContainer}>
                            <View style={styles.modalInfoLabel}>
                                <XText>Confirm New Password</XText>
                            </View>
                            <TextInput
                                style={styles.modalInfoVal}
                                value={confirmNewPassword}
                                onChangeText={text => setConfirmNewPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                </MyModal>

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
    }
})
