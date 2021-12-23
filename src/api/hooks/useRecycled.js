import React, { useState, useContext } from "react"
import api from "../api"
import { AuthContext } from "../../providers/AuthProvider"

const useRecycled = () => {

    const [recycled, setRecycled] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const getRecycled = async() => {
        setLoading(true)
        await api({token: user.token}).get('/users/collects')
            .then(response => { 
                setRecycled(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data)
                setLoading(false)
            })
    }

    const getRecycledById = async(id) => {
        setLoading(true)
        await api({token: user.token}).get(`/users/collects/${id}`)
            .then(response => { 
                setRecycled(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    return {recycled, getRecycled, getRecycledById, loading}
}

export default useRecycled

