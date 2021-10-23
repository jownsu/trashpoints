import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import COLORS from '../../../consts/colors'

const WeCollectCard = ({title, info, img}) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardImgContainer}>
                <Image source={styles.cardImg} source={img} style={styles.cardImg} />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardInfo}>{info}</Text>
            </View>
        </View>
    )
}

export default WeCollectCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 7,
        margin: 10
    },
    cardImgContainer:{
        width: 100,
        height: 150,
    },
    cardImg:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    cardTextContainer:{
        flex: 1
    },
    cardTitle:{
        fontSize: 23,
        fontWeight: 'bold'
    },
    cardInfo:{
    }
})
