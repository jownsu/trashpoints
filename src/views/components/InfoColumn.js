import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

const InfoColumn = ({label, value, onEditPress}) => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.info}>
                <Text style={styles.infoLabel}>{label}</Text>                        
                <Text style={styles.infoVal}>{value}</Text>
            </View>

            <TouchableOpacity style={styles.btnAction} onPress={onEditPress}>
                <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InfoColumn

const styles = StyleSheet.create({

    infoContainer:{
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    info:{
        flex: 1,
    },
    infoLabel:{
        fontSize: 14,
        marginBottom: 7
    },
    infoVal:{
        fontSize: 16,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: COLORS.grey
    },
    btnAction:{
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        height: 25,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: COLORS.white
    }
})
