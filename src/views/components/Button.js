import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

const BtnPrimary = ({title, onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={styles.primaryBtn}>
                <Text style={styles.primaryBtnTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const BtnSecondary = ({title, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryBtnTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    secondaryBtn: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryBtnTitle: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16
    },
})

export { BtnPrimary, BtnSecondary }
