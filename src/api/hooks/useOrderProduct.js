import React, { useState, useContext } from "react"
import api from "../api"
import { AuthContext } from "../../providers/AuthProvider"

const useOrderProduct = () => {

    const [orderProducts, setOrderProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const getOrderProducts = async(id) => {
        setLoading(true)
        await api({token: user.token}).get(`/users/orders/${id}`)
            .then(response => {
                setOrderProducts(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data);
                setLoading(false)
            })
    }

    const deleteOrder = async(id) => {
        setLoading(true)
        await api({token: user.token}).delete(`/users/orders/${id}`)
            .then(response => {
                console.log(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }

    return { orderProducts, getOrderProducts, deleteOrder, loading }
}

export default useOrderProduct