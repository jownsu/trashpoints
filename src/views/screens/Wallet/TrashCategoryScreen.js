import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import TrashCategoryList from '../../components/trashCategories/TrashCategoryList'
import TrashItem from '../../components/trashCategories/TrashItem'

import TPserver from '../../../api/TPserver'
import { AuthContext } from '../../../AuthProvider'

const TrashCategoryScreen = () => {
    const [index, setIndex] = useState(1)
    const { user, loading, setLoading } = useContext(AuthContext)

    const [trashes, setTrashes] = useState([])
    const [trashCategories, setTrashCategories] = useState([])
    useEffect(() => {
        TPserver.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        // setItem(plastic)
        getTrashCategories()
        getTrash(1)
    }, [])

    const getTrashCategories = async() => {
        setLoading(true)

        await TPserver.get('/trashCategories')
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

    const getTrash = async(id) => {
        setLoading(true)

        await TPserver.get(`/trashCategories/${id}`)
            .then(response => {
                let data = response.data.data
                setTrashes(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false)
            })
    }

    return (
        <View>
            { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null }

            <TrashCategoryList
                categories={trashCategories}
                currentIndex={index}
                onPress={(id) => {
                    setIndex(id)
                    getTrash(id)
                }}
            />

            <TrashItem
                items={trashes}
            />


        </View>
    )
}

export default TrashCategoryScreen

const styles = StyleSheet.create({
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    }
})
