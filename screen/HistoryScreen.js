import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderBar from '../components/HeaderBar'
import OrderCard from '../components/OrderCard'

const HistoryScreen = () => {
    const isFocus = useIsFocused()
    const [lstOrder, setLstOrder] = useState([])
    console.log('danh sach', lstOrder)
    const getOrder = async () => {
        try {
            data = await AsyncStorage.getItem('listHistory');
            data = JSON.parse(data)
            const a = data.map((item) => {
                return { ...item }
            })
            setLstOrder(a)
        }
        catch (error) {
        }

    };
    useEffect(() => {
        if (isFocus) {
            getOrder()
        }
    }, [isFocus])
    return (
        <View style={{ flex: 1, backgroundColor: '#252A32' }}>
            <HeaderBar name={'Order History'} />
            <FlatList
                style={{ marginBottom: 50 }}
                data={lstOrder}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                    return (
                        <OrderCard key={item.key} items={item.items} total={item.total} time={item.timeOrder} />
                    )
                }}
            >

            </FlatList>
            {/* {
                lstOrder.map(it => {

                    // return it.items.map(each => {
                    //     return (
                    //         <Text key={each.id} style={{ color: 'white' }}>{each.id}</Text>
                    //     )
                    // })
                    
                    return (
                        <OrderCard items={it.items} total={it.total} time={it.timeOrder} />
                    )

                })
            } */}

        </View>
    )
}


const styles = StyleSheet.create({})
export default HistoryScreen