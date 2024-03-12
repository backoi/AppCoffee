import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const PaymentMode = ({ mode, icon, name }) => {

    return (
        <View style={{ margin: 10, borderColor: (mode == name) ? '#D17842' : '#0C0F14', borderWidth: 2, borderRadius: 23 }}>
            <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#0C0F14', '#52555A']} style={{ alignItems: 'center', flexDirection: 'row', borderRadius: 20, width: '100%', height: 50 }}>
                <Image source={icon} style={{ width: 30, height: 30, marginLeft: 20 }}></Image>
                <Text style={{ color: 'white', fontSize: 22, fontWeight: '500', marginLeft: 20 }}>{name}</Text>
            </LinearGradient>
        </View>
    )
}

export default PaymentMode

const styles = StyleSheet.create({})