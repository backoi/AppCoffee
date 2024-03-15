import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const CardCart = ({ item, clickAdd, clickSub }) => {

    return (
        <View>
            <LinearGradient key={item.id} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#52555A', '#252A32']} style={{ width: '100%', borderRadius: 20, marginBottom: 30 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15, }}>
                    <View style={{}}>
                        <Image source={item.imagelink_square} style={{ width: 110, height: 110, borderRadius: 15 }}></Image>
                    </View>
                    <View style={{ marginLeft: 20, }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>{item.name}</Text>
                        <Text style={{ color: 'white', marginTop: 5 }}>{item.special_ingredient}</Text>
                        <View style={{ backgroundColor: '#0C0F14', padding: 15, marginTop: 10, borderRadius: 12 }}>
                            <Text style={{ color: 'white' }}>{item.roasted}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
                    <View style={{ backgroundColor: '#0C0F14', width: 80, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                        <Text style={{ color: 'white' }}>{item.prices[1].size}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                        <Text style={{ color: '#D17842', fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>$</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{item.prices[1].price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => clickSub()} style={{ width: 35, height: 35, backgroundColor: '#D17842', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>-</Text>
                        </TouchableOpacity>
                        <View style={{ width: 60, height: 35, backgroundColor: '#0C0F14', borderRadius: 10, borderWidth: 2, borderColor: '#D17842', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>{item.quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={() => clickAdd()} style={{ width: 35, height: 35, backgroundColor: '#D17842', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </LinearGradient>
        </View>
    )
}

export default CardCart

const styles = StyleSheet.create({})