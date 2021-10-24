import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const XText = ({children, style, bold = false, numberOfLines,adjustsFontSizeToFit}) => {
    return (
            <Text 
                style={{ ...style, fontFamily: bold ? 'Montserrat-bold' : 'Montserrat' }}
                numberOfLines={numberOfLines}
                adjustsFontSizeToFit={adjustsFontSizeToFit} 
            >
                {children}
            </Text>
    )
}

export default XText
