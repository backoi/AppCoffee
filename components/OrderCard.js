import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import ItemOrderCard from './ItemOrderCard'

const OrderCard = ({ items, total, time, }) => {
    console.log(items)
    return (
        <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Order Date</Text>
                    <Text style={{ color: 'white' }}>{time}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Total Amount</Text>
                    <Text style={{ alignSelf: 'flex-end', color: '#D17842' }}>$ {total}</Text>
                </View>
            </View>
            {
                items.map((item) => {
                    return (
                        <ItemOrderCard item={item} />
                    )
                }
                )
            }

        </View >
    )
}

export default OrderCard

const styles = StyleSheet.create({})