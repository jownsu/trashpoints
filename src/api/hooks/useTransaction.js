import React, {useState, useContext} from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useTransaction = () => {

    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState({})
    const [loading, setLoading] = useState(false)

    const getTransactions = async() => {
        setLoading(true)

        await api({token: user.token}).get('/users/transactions')
            .then(response => {
                setTransactions(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data);
                setLoading(false)
            })
    }

    const getTransactionById = async(id) => {
        setLoading(true)

        await api({token: user.token}).get(`/users/transactions/${id}`)
            .then(response => {
                setTransactions(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error?.response?.data);
                setLoading(false)
            })
    }

    return { transactions, getTransactions, getTransactionById, loading }
}

export default useTransaction
