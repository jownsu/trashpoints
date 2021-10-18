import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, RecyclerViewBackedScrollViewBase } from 'react-native'
import { Feather } from '@expo/vector-icons';
import COLORS from '../../consts/colors';

const Avatar = ({ imgPath, onPress, height = 60, width = 60, editHeight = 25, editWidth = 25, iconSize = 14 }) => {

    return (
        <View style={{...styles.container, height, width}}>
            <Image style={styles.headerImg} source={{uri: 'http://192.168.1.6:80/img/' + imgPath}} />
                <TouchableOpacity style={{ ...styles.editContainer, height:editHeight, width:editWidth }} onPress={onPress} >
                    <Feather name="edit" size={iconSize} color="black" />
                </TouchableOpacity>

        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container:{
        borderRadius: 50
    },
    headerImg: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: 50
    },
    editContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.black
    }
})

function setHeightandWidth(height, width){
    heights = height
    widths = width
}