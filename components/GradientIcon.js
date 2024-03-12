import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome6'


const GradientIcon = ({ name, color, size, height, width }) => {
    return (
        <View style={{ borderRadius: 10, borderWidth: 2, backgroundColor: 'red', overflow: 'hidden', }}>
            <LinearGradient start={{ x: 0, y: 0 }} colors={['#999999', '#000000']} style={{ height: height, width: width, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={name} size={size} color={color}></Icon>
            </LinearGradient>
        </View>
    )
}

export default GradientIcon
