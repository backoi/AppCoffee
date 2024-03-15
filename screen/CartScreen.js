import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import HeaderBar from '../components/HeaderBar';
import CoffeeData from '../data/CoffeeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native';
import CardCart from '../components/CardCart';
import BeansData from '../data/BeansData';

const CartScreen = ({ navigation }) => {
    const isFocus = useIsFocused()
    const [lstCart, setLstCart] = useState([])
    const [total, setTotal] = useState('')
    const renderCart = async () => {
        try {
            data = await AsyncStorage.getItem('listCart');
            data = JSON.parse(data)
            array = data.map((item) => {

                const a = CoffeeData.find(it => it.id == item.id) || BeansData.find(it => it.id == item.id)
                return { ...a, quantity: item.count, totalPrice: item.count * 3.15 }
            })
            console.log('mang muon xem', array)
            getTotal(array)
            setLstCart(array)
        } catch (error) {
        }

    };
    const getTotal = (list) => {
        let total = 0
        list.map(item => {
            total = total + (item.quantity * item.prices[1].price)
        })
        setTotal(total.toFixed(2))
    };
    const handleIncrease = async (it) => {

        const newList = lstCart.map(item => {

            if (item.id == it.id) {
                it.quantity++
                it.totalPrice += 3.15
            }
            return { ...item }
        })
        //code cập nhật kho
        try {
            const a = await AsyncStorage.getItem('listCart')
            let lst = JSON.parse(a)
            const vitri = lst.findIndex((each) => each.id == it.id)
            lst.splice(vitri, 1, { id: it.id, count: it.quantity })
            const jsonValue = JSON.stringify(lst);
            await AsyncStorage.setItem('listCart', jsonValue);
        } catch (e) {
            // error reading value
        }
        getTotal(newList)
        setLstCart(newList)
    };

    const handleReduce = async (it) => {
        if (it.sl == 1) {
            const vt = lstCart.findIndex((each) => each.id == it.id)
            lstCart.splice(vt, 1)
            try {
                const a = await AsyncStorage.getItem('listCart')
                let lst = JSON.parse(a)
                const vitri = lst.findIndex((each) => each.id == it.id)
                lst.splice(vitri, 1)
                const jsonValue = JSON.stringify(lst);
                await AsyncStorage.setItem('listCart', jsonValue);
            } catch (e) {
                // error reading value
            }
            getTotal(lstCart)
            setLstCart([...lstCart])
        }
        else {
            const newList = lstCart.map((item) => {
                if (item.id == it.id) {
                    it.quantity--
                    it.totalPrice -= 3.15
                }
                return { ...item }
            })
            try {
                const a = await AsyncStorage.getItem('listCart')
                let lst = JSON.parse(a)
                const vitri = lst.findIndex((each) => each.id == it.id)
                lst.splice(vitri, 1, { id: it.id, count: it.quantity })
                const jsonValue = JSON.stringify(lst);
                await AsyncStorage.setItem('listCart', jsonValue);
                //newList = lst
            } catch (e) {
                // error reading value
            }
            getTotal(newList)
            setLstCart(newList)
        }

    };

    useEffect(() => {
        //console.log('trong effect')
        if (isFocus) {
            getTotal(lstCart)
            renderCart()
        }
    }, [isFocus]);
    return (
        <View style={{ flex: 1, backgroundColor: '#252A32', }}>
            <HeaderBar name={'Cart'} />
            {
                lstCart.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 30 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{ marginBottom: 120 }}
                                data={lstCart}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <CardCart key={item.id} item={item} clickAdd={() => handleIncrease(item)} clickSub={() => handleReduce(item)} />
                                    )
                                }}
                            >
                            </FlatList>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', position: 'absolute', bottom: 60 }}>
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
                ) : (<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                    <Image style={{ width: 300, height: 400 }} resizeMode='contain' source={require('../assets/imgs/logo/coca.png')}></Image>
                </View>)
            }

        </View >
    )
}

export default CartScreen
