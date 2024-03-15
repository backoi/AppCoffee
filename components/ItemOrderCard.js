import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const ItemOrderCard = ({ item, }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#52555A', '#252A32']} style={{ borderRadius: 12, }}>
                <View style={{ margin: 20 }}>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image source={item.imagelink_square} style={{ width: 70, height: 70, borderRadius: 15 }}></Image>
                            <View>
                                <Text style={{ fontSize: 20, color: 'white' }}>{item.name}</Text>
                                <Text style={{ color: 'white' }}>{item.special_ingredient}</Text>
                            </View>
                            <Text style={{ fontSize: 25, marginLeft: 5, color: '#D17842' }}>{item.totalPrice}</Text>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 40, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, backgroundColor: '#252A32', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>M</Text>
                        </View>
                        <View style={{ width: 70, height: 40, borderTopRightRadius: 12, borderBottomRightRadius: 12, backgroundColor: '#252A32', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#D17842', fontSize: 18 }}>$</Text>
                                <Text style={{ marginLeft: 5, fontSize: 18, color: 'white' }}>3.20</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 25, color: '#D17842' }}>X</Text>
                            <Text style={{ fontSize: 25, marginLeft: 5, color: 'white' }}>{item.quantity}</Text>
                        </View>

                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default ItemOrderCard

const styles = StyleSheet.create({})