import React from 'react'
import { StyleSheet, ImageBackground, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import COLORS from '../../../consts/colors'
import XText from '../XText'

const Header = ({title = 'TrashPoints', onBackPress, rightIcon = false}) => {
    return (
        <ImageBackground source={require('../../../assets/header.jpg')} style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={onBackPress}>
                <AntDesign name="back" size={24} color="white" />
            </TouchableOpacity>
            <XText bold style={styles.headerText}>{title}</XText>
            {
              rightIcon
                ? <View style={styles.rightIcon}>{rightIcon()}</View>
                : null
            }
        </ImageBackground>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        backgroundColor: COLORS.primary,
        flexDirection: 'row'
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
      rightIcon:{
        position: 'absolute',
        right: 20
      }
})
