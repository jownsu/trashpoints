import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

import XText from './XText'

const MyModal = ({children, visible, onCancelPress, onConfirmPress}) => {
    return (
        <Modal
        transparent
        visible={visible}
        animationType={'fade'}
        >
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalInfoContainer}>
                        {children}
                    </View>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.modalBtnCancel} onPress={onCancelPress}>
                            <XText style={styles.modalTextCancel}>Cancel</XText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalBtnSave} onPress={onConfirmPress}>
                            <XText style={styles.modalTextSave}>Confirm</XText>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </Modal>
    )
}

export default MyModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: COLORS.white,
        elevation: 11,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    modalFooter:{
        flexDirection: 'row',
        height: 35,
    },
    modalBtnCancel:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBtnSave:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    },
    modalTextCancel:{
        color: COLORS.red,
        fontWeight: 'bold'
    },
    modalTextSave: {
        color: COLORS.white
    },
    modalInfoContainer:{
        justifyContent: 'center',
        marginHorizontal: 20,
        width: 250,
    },
})
