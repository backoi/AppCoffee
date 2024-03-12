import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PaymentScreen = ({ navigation, route }) => {
    item = route.params.lstCard
    total = route.params.total
    return (
        //khi click thanh toan luu du lieu vao store de su dung ben history
        <View>
            <Text>{total}</Text>
        </View>
    )
}

export default PaymentScreen

