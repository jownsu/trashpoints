import React, { useState, useContext,useReducer } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'
import mime from 'mime'

const useUser = () => {
    const { user, setLoading } = useContext(AuthContext)
    //const [userInfo, setUserInfo] = useState({})

    const [userInfo, setUserInfo] = useState({})

    const getUserInfo = async() =>{
        await api({token: user.token}).get('/users')
            .then(response => {setUserInfo(response.data.data)})
            .catch(error => {})
    }

    const updateUserInfo = async(newInfo) => {
        setLoading(true)
        await api({token: user.token}).put('/users', newInfo)
            .then(response => {
                setUserInfo(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                let errMsg = error;
                if(errMsg.errors){
                    if(errMsg.errors.current_password){
                        alert(errMsg.errors.current_password[0])
                    }else{
                        alert(errMsg.message)
                    }
                }else{
                    alert(errMsg.message)
                }
                setLoading(false)
            })
    }

    const changePassword = async(passInfo) => {
        setLoading(true)
        await api({token: user.token}).put('/users/changepassword', passInfo)
            .then(response => { 
                setUserInfo(response.data.data)
                setLoading(false)
             })
            .catch(error => {
                alert(error.message);
                setLoading(false)
            })
    }

    const updateAvatar = async(img) => {
        setLoading(true)
        const newImageUri =  "file:///" + img.split("file:/").join("");
        const data = new FormData()

        data.append('avatar', {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        })

        data.append('_method', 'put')

        await api({token: user.token}).post('/users/uploadavatar', data)
            .then(response => {
                if(response.data.success == true){
                    setUserInfo(response.data.data)
                }
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    return { userInfo, getUserInfo, updateUserInfo, changePassword, updateAvatar }

}

export default useUser