import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors'

const MyModal = ({children, visible, onCancelPress, onSavePress}) => {
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
                            <Text style={styles.modalTextCancel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalBtnSave} onPress={onSavePress}>
                            <Text style={styles.modalTextSave}>Save</Text>
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
        elevation: 11
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
