import React, {useState, useContext} from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useTrash = () => {
    const { user } = useContext(AuthContext)
    const [trashes, setTrashes] = useState([])
    const [loading, setLoading] = useState(false)

    const getTrashes = async(id) => {
        setLoading(true)

        await api({token: user.token}).get(`/users/trashes?category=${id}`)
            .then(response => {
                let data = response.data.data
                setTrashes(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    return {trashes, getTrashes, loading}

}

export default useTrash

