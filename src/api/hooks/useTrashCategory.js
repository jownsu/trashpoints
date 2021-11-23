import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useTrashCategory = () => {
    const { user } = useContext(AuthContext)
    const [trashCategories, setTrashCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const getTrashCategories = async() => {
        setLoading(true)
        await api({token: user.token}).get('/users/trashCategories')
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

    return {trashCategories, getTrashCategories, loading}

}

export default useTrashCategory
