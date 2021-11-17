import React, {useState, useContext} from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useTrash = () => {
    const { user, setLoading } = useContext(AuthContext)
    const [trashes, setTrashes] = useState([])

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

    return [trashes, getTrashes]

}

export default useTrash

