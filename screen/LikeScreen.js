import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import CardFav from '../components/CardFav';
import HeaderBar from '../components/HeaderBar';
const LikeScreen = ({ navigation }) => {
    console.log('baa')
    const isFocus = useIsFocused()
    const [lstLiked, setLstLiked] = useState([])
    const getListLiked = async () => {
        try {
            const a = await AsyncStorage.getItem('listLiked')
            let lst = JSON.parse(a)
            console.log('danh sach tren kho', lst)
            let data = lst.map((each) => {
                return CoffeeData.find(it => it.id == each)
                // CoffeeData.map((item) => {
                //     if (item.id == each) {
                //         //console.log('trung', item.id, each)
                //         liked.push(item)
                //         liked.reverse()
                //     }
                // })
            })
            console.log('danh sach', data)
            setLstLiked(data)
            //console.log('danh sach liked', lstLiked)
            //
        } catch (error) {

        }
        //
    };
    useEffect(() => {
        if (isFocus) {
            getListLiked()
        }
    }, [isFocus])
    return (
        <View style={{ flex: 1, backgroundColor: '#252A32' }}>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <HeaderBar name={'Favorites'} />
                {
                    lstLiked.map(item => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Details', item)}>
                                <View style={{}}>
                                    <CardFav item={item} />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView >
        </View>


    )




}
export default LikeScreen
