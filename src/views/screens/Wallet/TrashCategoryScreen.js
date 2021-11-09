import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import TrashCategoryList from '../../components/trashCategories/TrashCategoryList'
import TrashItem from '../../components/trashCategories/TrashItem'

import { AuthContext } from '../../../providers/AuthProvider'
import useTrashCategory from '../../../api/hooks/useTrashCategory'
import useTrash from '../../../api/hooks/useTrash'

const TrashCategoryScreen = () => {
    const [index, setIndex] = useState(1)
    const { loading } = useContext(AuthContext)

    const [trashes, getTrashes] = useTrash()
    const [trashCategories, getTrashCategories] = useTrashCategory()

    useEffect(() => {
        getTrashCategories()
        getTrashes(1)
    }, [])

    return (
        <View>
            { loading ? <ActivityIndicator size="large" color="#000" style={styles.loading}/> : null }

            <TrashCategoryList
                categories={trashCategories}
                currentIndex={index}
                onPress={(id) => {
                    setIndex(id)
                    getTrashes(id)
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
