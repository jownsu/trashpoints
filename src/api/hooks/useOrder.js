import React, { useState, useContext } from "react"
import api from "../api"
import { AuthContext } from "../../providers/AuthProvider"

const useOrder = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const getOrders = async() => {
        setLoading(true)
        await api({token: user.token}).get('/users/orders')
            .then(response => { 
                setOrders(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data)
                setLoading(false)
            })
    }

    return {orders, getOrders, loading}
}

export default useOrder

