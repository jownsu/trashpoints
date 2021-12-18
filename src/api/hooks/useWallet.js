import React, {useState, useContext} from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useWallet = () => {

    const { user } = useContext(AuthContext);
    const [wallet, setWallet] = useState({ "total_earned": 0,
                                            "total_spent": 0,
                                            "total_pending": 0,
                                            "balance": 0 })
    const [loading, setLoading] = useState(false)

    const getWallet = async() => {
        setLoading(true)

        await api({token: user.token}).get('/users/wallet')
            .then(response => {
                setWallet(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }

    return { wallet, getWallet, loading }
    

}

export default useWallet
