import React, { useContext, useEffect, useState, useReducer } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../../api/api'

import COLORS from '../../consts/colors'
import Avatar from '../components/Avatar'
import InfoColumn from '../components/InfoColumn'

import XText from '../components/XText'

import mime from 'mime'
import * as ImagePicker from 'expo-image-picker';
import MyModal from '../components/Modal'

import { Ionicons, MaterialIcons, Octicons, Entypo } from '@expo/vector-icons'

const ProfileScreen = () => {
    //functions

    const getMyInfo = async () => {
        setLoading(true)
        await api({token: user.token}).get('/me')
            .then(response => {
                let userInfo = response.data.data
                setInputUserInfo({field: 'all', values: userInfo})
                setUserInfo(userInfo)
                setLoading(false)
            })
            .catch(error => {
                if(error.response.data){
                    alert("Something went wrong")
                }
                setLoading(false)
            })
    }

    const updateMyInfo = async () => {
        setLoading(true)
        await api({token: user.token}).put(`/users/${inputUserInfo.id}`, inputUserInfo)
            .then(response => {
                if(response.data.success == true){
                    setUserInfo(inputUserInfo)
                    // setInputUserInfo({field: 'confirm_password', values: ""})
                    getMyInfo() 
                }
            setLoading(false)
            })
            .catch(error => {
                let errMsg = error.response.data;
                console.log(errMsg)
                if(errMsg.errors){
                    if(errMsg.errors.confirm_password){
                        alert(errMsg.errors.confirm_password[0])
                    }else{
                        alert(errMsg.message)
                    }
                }else{
                    alert(errMsg.message)
                }
                setInputUserInfo({field: 'all', values: userInfo})
                setLoading(false)
            })
    }

    const changePassword = async () => {
        setLoading(true)
        await api({token: user.token}).post('/changepassword', password)
            .then(response => {
                if(response.data.success == true){
                    alert(response.data.data.message)
                }
            setLoading(false)
            })
            .catch(error => {
                    alert(error.response.data.message)
                    setLoading(false)
            })
    }

    const updateAvatar = async (img) => {
        setLoading(true)
        const newImageUri =  "file:///" + img.split("file:/").join("");
        const data = new FormData()

        data.append('avatar', {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        })

        data.append('_method', 'put')

        await api({token: user.token}).post('/uploadavatar', data).then(response => {
            console.log(response.data)
            if(response.data.success == true){
                getMyInfo()
            }
            setLoading(false)
        })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }
    
    const getFullName = () => userInfo.firstname + " " + (userInfo.middlename ? userInfo.middlename + " " : '') + userInfo.lastname
    
    //end of functions

    const { logout, user, loading, setLoading } = useContext(AuthContext)


    const [showModal, setShowModal] = useState(false)
    const [modalToShow, setModalToShow] = useState('')
    const [userInfo, setUserInfo] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        contact_no: "",
        address: "",
        avatar: ""
    })
    
    useEffect(() => {
        getMyInfo()
    }, [])    

    const [inputUserInfo, setInputUserInfo] = useReducer(InputUserReducer, {
        id: "",
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        contact_no: "",
        address: "",
        confirm_password: ""
    })
    
    const [password, setPassword] = useReducer(passwordReducer, {
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
    })
    //which modal will show on screen
    const renderInputModal = (modalToShow) => {
        
        switch (modalToShow) {
            case 'displayName':
                return displayNameInputModal({firstname: inputUserInfo.firstname, middlename: inputUserInfo.middlename, lastname: inputUserInfo.lastname})
            case 'email':
                return oneInputModal('Email', 'email' ,inputUserInfo.email)
            case 'contactNo':
                return oneInputModal('Contact Number', 'contact_no', inputUserInfo.contact_no)
            case 'address':
                return oneInputModal('Address', 'address', inputUserInfo.address)
            case 'password':
                return displayPasswordInputModal()
            default:
                return;
        }
    }

    //for one liner modal
    const oneInputModal = (label, field, values) => {
        return(
            <View>
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>{label}</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={values}
                        onChangeText={text => setInputUserInfo({field, values: text})}
                    />
                </View>

                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Confirm Password</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={inputUserInfo.confirm_password}
                        onChangeText={ text => setInputUserInfo({field: 'confirm_password', values: text})}
                        secureTextEntry
                    />
                </View>

            </View>
        )
    }
    //for multi line modal specific for name *firstname *middlename *lastname
    const displayNameInputModal = (value) => {
        return(
            <View>
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Firstname</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={value.firstname}
                        onChangeText={text => setInputUserInfo({field: 'firstname', values: text})}
                    />
                </View>
    
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Middlename</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={value.middlename}
                        onChangeText={text => setInputUserInfo({field: 'middlename', values: text})}
                    />
                </View>
    
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Lastname</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={value.lastname}
                        onChangeText={text => setInputUserInfo({field: 'lastname', values: text})}
                    />
                </View>

                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Confirm Password</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={inputUserInfo.confirm_password}
                        onChangeText={ text => setInputUserInfo({field: 'confirm_password', values: text})}
                        secureTextEntry
                    />
                </View>
    
            </View>
        )
    }
    //for password modal *old/new/confirm pass
    const displayPasswordInputModal = () => {
        return(
            <View>
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Current Password</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={password.current_password}
                        onChangeText={text => setPassword({field: 'current_password', values: text})}
                        secureTextEntry
                    />
                </View>
    
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>New Password</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={password.new_password}
                        onChangeText={text => setPassword({field: 'new_password', values: text})}
                        secureTextEntry
                    />
                </View>
    
                <View style={styles.modalInputContainer}>
                    <View style={styles.modalInfoLabel}>
                        <XText>Confirm New Password</XText>
                    </View>
                    <TextInput 
                        style={styles.modalInfoVal}
                        value={password.new_password_confirmation}
                        onChangeText={text => setPassword({field: 'new_password_confirmation', values: text})}
                        secureTextEntry
                    />
                </View>
            </View>
    
        )
    }

    const pickImage = async () => {
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
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
                        <XText style={styles.headerName}>{getFullName()}</XText>
                        <View style={styles.chipContainer}>
                            <XText style={styles.chipText}>Verified</XText>
                        </View>
                    </View>
                </View>

                <View style={styles.infoContainer}>

                    <InfoColumn 
                        label={'Display Name'}
                        value={getFullName()}
                        onEditPress={() => {
                            setModalToShow('displayName')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Email'}
                        value={userInfo.email}
                        onEditPress={() => {
                            setModalToShow('email')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Contact Number'}
                        value={userInfo.contact_no}
                        onEditPress={() => {
                            setModalToShow('contactNo')
                            setShowModal(true)
                        }}
                    />
                    <InfoColumn 
                        label={'Address'}
                        value={userInfo.address}
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


                <MyModal 
                    visible={showModal}
                    onCancelPress={() => {
                        setShowModal(false)
                        setModalToShow('')
                        setInputUserInfo({field: 'all', values: userInfo})
                    }}        
                    onSavePress={() => {
                        
                        modalToShow == 'password'
                        ? changePassword() 
                        : updateMyInfo()

                        setShowModal(false)
                        setModalToShow('')
                    }}        
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

const InputUserReducer = (inputUserInfo, action) => {
    //action = field,values

    switch (action.field) {
        case 'all':
            return {...action.values}
        case 'email':
            return {...inputUserInfo, email: action.values}
        case 'firstname':
            return {...inputUserInfo, firstname: action.values}
        case 'middlename':
            return {...inputUserInfo, middlename: action.values}
        case 'lastname':
            return {...inputUserInfo, lastname: action.values}
        case 'contact_no':
            return {...inputUserInfo, contact_no: action.values}
        case 'address':
            return {...inputUserInfo, address: action.values}
        case 'confirm_password':
            return {...inputUserInfo, confirm_password: action.values}
    }
}

const passwordReducer = (password, action) => {
    //action = field,values

    switch (action.field) {
        case 'current_password':
            return {...password, current_password: action.values}
        case 'new_password':
            return {...password, new_password: action.values}
        case 'new_password_confirmation':
            return {...password, new_password_confirmation: action.values}
        default:
            return password
    }
}