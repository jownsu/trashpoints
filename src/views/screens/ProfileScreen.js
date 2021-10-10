import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../AuthProvider'
import TPserver from '../../api/TPserver'
import COLORS from '../../consts/colors'
import Avatar from '../components/Avatar'
import InfoColumn from '../components/InfoColumn'

import MyModal from '../components/Modal'

import { Ionicons, MaterialIcons, Octicons, Entypo } from '@expo/vector-icons'

const ProfileScreen = () => {
    const { logout, user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [modalToShow, setModalToShow] = useState('')

    useEffect(() => {
        TPserver.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    }, [])    
    
    const renderInputModal = (modalToShow) => {
        
        switch (modalToShow) {
            case 'displayName':
                return displayNameInputModal({firstname: user.firstname, middlename: user.middlename, lastname: user.lastname})
            case 'email':
                return oneInputModal('Email', user.email)
            case 'contactNo':
                return oneInputModal('Contact Number', user.contact_no)
            case 'address':
                return oneInputModal('Address', user.address)
            case 'password':
                return displayPasswordInputModal()
            default:
                return;
        }
    }


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>

                <View style={styles.headerContainer}>
                    <View style={styles.avatar}>
                        <Avatar 
                            imgPath = {() => require('../../assets/person.jpg') }
                            onPress = { () => { alert('clicked') } }
                            height = { 100 }
                            width = { 100 }
                            editHeight = { 35 }
                            editWidth = { 35 }
                            iconSize = { 21 }
                        />
                    </View>

                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{`${user.firstname} ${user.middlename} ${user.lastname}`}</Text>
                        <View style={styles.chipContainer}>
                            <Text style={styles.chipText}>Verified</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoContainer}>

                    <InfoColumn 
                        label={'Display Name'}
                        value={`${user.firstname} ${user.middlename} ${user.lastname}`}
                        onEditPress={() => {
                            setModalToShow('displayName')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Email'}
                        value={user.email}
                        onEditPress={() => {
                            setModalToShow('email')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Contact Number'}
                        value={user.contact_no}
                        onEditPress={() => {
                            setModalToShow('contactNo')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Address'}
                        value={user.address}
                        onEditPress={() => {
                            setModalToShow('address')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Password'}
                        value={'********'}
                        onEditPress={() => {
                            setModalToShow('password')
                            setShowModal(true)
                        }}
                    />

                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <Ionicons style={styles.actionIcon} name="help" size={24} color="black" />
                            <Text style={styles.actionText}>Help</Text>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <Octicons style={styles.actionIcon} name="info" size={24} color="black" />
                            <Text style={styles.actionText}>About Us</Text>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <MaterialIcons style={styles.actionIcon} name="privacy-tip" size={24} color="black" />
                            <Text style={styles.actionText}>Privacy Policy</Text>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.actionBtn}>
                        <View style={styles.actionInfo}>
                            <Ionicons style={styles.actionIcon} name="settings-sharp" size={24} color="black" />
                            <Text style={styles.actionText}>Settings</Text>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.actionBtn} onPress={ () => logout() }>
                        <View style={styles.actionInfo}>
                            <MaterialIcons style={styles.actionIcon} name="logout" size={24} color={COLORS.red} />
                            <Text style={styles.actionText}>Logout</Text>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </TouchableOpacity>

                </View>            

                <MyModal 
                    visible={showModal}
                    onCancelPress={() => setShowModal(false)}        
                    onSavePress={() => setShowModal(false)}        
                >
                    { renderInputModal(modalToShow) }
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
        fontSize: 21,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        fontSize: 16,
        borderBottomWidth: 1
    },
    modalInputContainer: {
        paddingVertical: 10
    }
})

const oneInputModal = (label, value) => {
    return(
        <View style={styles.modalInputContainer}>
            <View style={styles.modalInfoLabel}>
                <Text>{label}</Text>
            </View>
            <TextInput 
                style={styles.modalInfoVal}
                value={value}
            />
        </View>
    )
}

const displayNameInputModal = (value) => {
    return(
        <View>
            <View style={styles.modalInputContainer}>
                <View style={styles.modalInfoLabel}>
                    <Text>Firstname</Text>
                </View>
                <TextInput 
                    style={styles.modalInfoVal}
                    value={value.firstname}
                />
            </View>

            <View style={styles.modalInputContainer}>
                <View style={styles.modalInfoLabel}>
                    <Text>Middlename</Text>
                </View>
                <TextInput 
                    style={styles.modalInfoVal}
                    value={value.middlename}
                />
            </View>

            <View style={styles.modalInputContainer}>
                <View style={styles.modalInfoLabel}>
                    <Text>Lastname</Text>
                </View>
                <TextInput 
                    style={styles.modalInfoVal}
                    value={value.lastname}
                />
            </View>

        </View>
    )
}

const displayPasswordInputModal = () => {
    return(
        <View>
            <View style={styles.modalInputContainer}>
                <View style={styles.modalInfoLabel}>
                    <Text>Current Password</Text>
                </View>
                <TextInput 
                    style={styles.modalInfoVal}
                    // value={}
                    secureTextEntry
                />
            </View>

            <View style={styles.modalInputContainer}>
                <View style={styles.modalInfoLabel}>
                    <Text>Cofirm Password</Text>
                </View>
                <TextInput 
                    style={styles.modalInfoVal}
                    // value={}
                    secureTextEntry
                />
            </View>

            <View style={styles.modalInputContainer}>
                <View style={styles.modalInfoLabel}>
                    <Text>Confirm New Password</Text>
                </View>
                <TextInput 
                    style={styles.modalInfoVal}
                    // value={}
                    secureTextEntry
                />
            </View>
        </View>

    )
}