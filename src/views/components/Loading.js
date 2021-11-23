import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import COLORS from '../../consts/colors'

const Loading = () => {
    return (
        <ActivityIndicator animating={true} color={COLORS.primary} style={styles.loading} size='large' />
    )
}

export default Loading

const styles = StyleSheet.create({
    loading:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
