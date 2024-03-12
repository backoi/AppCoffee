import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Add from './Add'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ item }) => {
    const handleAdd = async () => {
        let listCard = []
        const jsonValue = await AsyncStorage.getItem('listCart');
        if (jsonValue) {
            listCard = JSON.parse(jsonValue)
            try {
                const vitri = listCard.findIndex((it) => it.id == item.id)
                if (vitri != -1) {
                    listCard.splice(vitri, 1, { id: item.id, count: listCard[vitri].count + 1 })
                }
                else {
                    listCard.push({ id: item.id, count: 1 })
                }
                const json = JSON.stringify(listCard);
                await AsyncStorage.setItem('listCart', json);
                console.log('sau khi add', listCard)
            }
            catch (error) {
            }
        }
    }
    //console.log(item.prices[0].price)
    //console.log(navigation)
    return (
        <View style={{ margin: 20 }}>
            <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#0C0F14', '#52555A']} style={{ borderRadius: 30, paddingBottom: 30 }}>
                <ImageBackground resizeMode='cover' source={item.imagelink_square} imageStyle={{ borderRadius: 30 }}
                    style={{
                        height: 200, width: 200, margin: 20,
                    }}>
                    <View style={{ padding: 10, backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', right: 0, borderBottomLeftRadius: 30, borderTopRightRadius: 29, flexDirection: 'row', alignItems: 'center' }}>

                        <Icon name='star' size={12} color={'#D17842'} />
                        <Text style={{ marginLeft: 5, color: 'white', fontWeight: 'bold' }}>{item.average_rating}</Text>
                    </View>
                </ImageBackground>
                <View>
                    <Text style={{ color: 'white', marginLeft: 20, fontSize: 20 }}>{item.name}
                    </Text>
                    <Text style={{ color: 'white', marginLeft: 20 }}>{item.special_ingredient}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingRight: 70, color: '#D17842' }}>$ <Text style={{ color: 'white' }}>{item.prices[2].price}
                        </Text></Text>
                        <Add click={handleAdd} />
                    </View>
                </View>
            </LinearGradient>
        </View >
    )
}

export default Card
