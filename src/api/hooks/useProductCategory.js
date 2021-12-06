import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useProductCategory = () => {
    const { user } = useContext(AuthContext)
    const [productCategories, setProductCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const getProductCategories = async () => {
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

    const addCategory = async(name, image) => {
        await api().post('/admin/prodcutCateody', {name, image})
            .then(response => {
                alert(response.data.data.name + " is added")
            })
    }

    return {productCategories, getProductCategories, loading}

}

export default useProductCategory

