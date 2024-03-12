import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import HeaderBar from '../components/HeaderBar';
import CoffeeData from '../data/CoffeeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const CartScreen = ({ navigation }) => {
    //xử lý tăng số lương
    //mỗi lần nhấn thì lấy store duyệt xem trùng id thì splice và tăng count
    //setCount =store[vitri].soluong để render lại
    const isFocus = useIsFocused()
    const [lstCart, setLstCart] = useState([])
    const [total, setTotal] = useState('')
    const renderCart = async () => {
        //const array = []

        try {
            data = await AsyncStorage.getItem('listCart');
            data = JSON.parse(data)
            array = data.map((item) => {
                //setCount(item.count)
                const a = CoffeeData.find(it => it.id == item.id)
                return { ...a, sl: item.count }
            })
            getTotal(array)
            setLstCart(array)



        } catch (error) {
        }

    }
    const getTotal = (list) => {
        let total = 0
        list.map(item => {
            total = total + (item.sl * item.prices[1].price)
        })
        setTotal(total.toFixed(2))
    }
    const handleIncrease = async (it) => {

        const newList = lstCart.map(item => {

            if (item.id == it.id) {
                it.sl++
            }
            return { ...item }
        })
        //code cập nhật kho
        try {
            const a = await AsyncStorage.getItem('listCart')
            let lst = JSON.parse(a)
            const vitri = lst.findIndex((each) => each.id == it.id)
            lst.splice(vitri, 1, { id: it.id, count: it.sl })
            const jsonValue = JSON.stringify(lst);
            await AsyncStorage.setItem('listCart', jsonValue);
        } catch (e) {
            // error reading value
        }
        getTotal(newList)
        setLstCart(newList)




    }
    useEffect(() => {
        //console.log('trong effect')
        if (isFocus) {
            getTotal(lstCart)
            renderCart()

        }
    }, [isFocus])
    return (
        <View style={{ flex: 1, backgroundColor: '#252A32' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 70, backgroundColor: '#252A32' }} >
                <HeaderBar />
                <View style={{ alignItems: 'center', marginHorizontal: 25, }}>
                    {
                        lstCart.map(item => {
                            return (
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

                                    <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', marginBottom: 15 }}>
                                        <View style={{ backgroundColor: '#0C0F14', width: 80, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                                            <Text style={{ color: 'white' }}>{item.prices[1].size}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                                            <Text style={{ color: '#D17842', fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>$</Text>
                                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{item.prices[1].price}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <TouchableOpacity style={{ width: 35, height: 35, backgroundColor: '#D17842', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>-</Text>
                                            </TouchableOpacity>
                                            <View style={{ width: 60, height: 35, backgroundColor: '#0C0F14', borderRadius: 10, borderWidth: 2, borderColor: '#D17842', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
                                                <Text style={{ color: 'white', fontSize: 20 }}>{item.sl}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => handleIncrease(item)} style={{ width: 35, height: 35, backgroundColor: '#D17842', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </LinearGradient>

                            )
                        })
                    }

                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 70, justifyContent: 'space-evenly', width: '100%' }}>
                <View >
                    <Text style={{ color: 'white', }}>Total Price</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#D17842', fontSize: 20, fontWeight: 'bold', marginRight: 5 }}>$</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 5 }}>{total}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Payment', { total, lstCart })} style={{ width: '70%', height: 50, backgroundColor: '#D17842', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Pay</Text></TouchableOpacity>
            </View>

        </View>
    )
}

export default CartScreen
