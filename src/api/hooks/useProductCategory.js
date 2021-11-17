import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useProductCategory = () => {
    const { user, setLoading } = useContext(AuthContext)
    const [productCategories, setProductCategories] = useState([])

    const getProductCategory = async () => {
        setLoading(true)
        await api({token: user.token}).get('/users/productCategories')
            .then(response => {
                setProductCategories(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    return [productCategories, getProductCategory]

}

export default useProductCategory

