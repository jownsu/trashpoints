import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'

import TrashItem from '../../components/trashCategories/TrashItem'

import useTrash from '../../../api/hooks/useTrash'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../../../consts/colors'
import Loading from '../../components/Loading'

const TrashScreen = ({route, navigation}) => {
    const {trashes, getTrashes, loading} = useTrash()

    let {categoryId, categoryName} = route.params

    useEffect(() => {
        getTrashes(categoryId)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            { loading ? <Loading /> : null }

            <View style={styles.headerCollector}>
                <TouchableOpacity style={styles.backIcon} onPress={() => {navigation.pop()}}>
                    <AntDesign name="back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{categoryName}</Text>
            </View>
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
    headerCollector:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        marginBottom: 20

        },
      headerText:{
        textAlign: "center",
        color: "#ffffff",
        fontSize: 20,
      },
      backIcon:{
        position: 'absolute',
        left: 20
      },
})
