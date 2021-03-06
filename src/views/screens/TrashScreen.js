import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'

import TrashItem from '../components/trashCategories/TrashItem'

import useTrash from '../../api/hooks/useTrash'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../components/Loading'
import Header from '../components/headers/Header'

const TrashScreen = ({route, navigation}) => {
    const {trashes, getTrashes, loading} = useTrash()

    let {categoryId, categoryName} = route.params

    useEffect(() => {
        getTrashes(categoryId)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            { loading ? <Loading /> : null }

            <Header 
                title={categoryName}
                onBackPress={() => navigation.pop()}
            />
            <TrashItem
                items={trashes}
            />
        </SafeAreaView>
    )
}

export default TrashScreen

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100
    },
})