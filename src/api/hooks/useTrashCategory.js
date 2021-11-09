import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useTrashCategory = () => {
    const { user, setLoading } = useContext(AuthContext)
    const [trashCategories, setTrashCategories] = useState([])

    const getTrashCategories = async() => {
        setLoading(true)
        await api({token: user.token}).get('/trashCategories')
            .then(response => {
                let data = response.data.data
                setTrashCategories(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false)
            })
    }

    return [trashCategories, getTrashCategories]

}

export default useTrashCategory
