import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import COLORS from '../../../consts/colors'
import XText from '../XText'

const PlainHeader = ({title = false, onBackPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => onBackPress()}>
                <AntDesign name="back" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            {
                title ? <XText bold style={styles.headerText}>{title}</XText> 
                      : null 
            }
        </View>
    )
}

export default PlainHeader

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        flexDirection: 'row'
        },
      headerText:{
        textAlign: "center",
        color: COLORS.primary,
        fontSize: 20,
      },
      backIcon:{
        position: 'absolute',
        left: 20
      }
})
