import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from '../components/HeaderBar'
import Icon from 'react-native-vector-icons/FontAwesome6'
import CoffeeData from '../data/CoffeeData'
import BeansCoffe from '../data/BeansData'
import Card from '../components/Card'
import { Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
    // const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeData))
    const [searchText, setSearchText] = useState('')
    const [categories, setCategories] = useState(() => {
        let temp = {}
        for (i = 0; i < CoffeeData.length; i++) {
            if (temp[CoffeeData[i].name] == undefined) {
                temp[CoffeeData[i].name] = 1
            }
            else {
                temp[CoffeeData[i].name]++
            }

        }
        let categories = Object.keys(temp)
        //console.log(categories)
        categories.unshift('All')
        return categories
    })


    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0]
    })
    const getCoffeeList = (cate, data) => {
        if (cate == 'All') { return data }
        else {
            let list = data.filter(item => item.name == cate)
            return list
        }
    }
    const [sortedCoffee, setSortedCoffee] = useState(() => {
        if (categoryIndex.category == 'All') return CoffeeData
        else {
            let list = CoffeeData.filter((item) => item.name == categoryIndex.category)
            return list
        }
    })


    // useEffect(() => {
    //     const categoriesData = getCategories()
    //     setCategories(categoriesData)
    // }, [])
    const handleSearch = (text) => {
        setCategoryIndex({ index: 0, category: categories[0] })
        if (text != '') {
            //setSortedCoffee(CoffeeData)
            setSortedCoffee([...CoffeeData.filter((item) => {
                return item.name.toLowerCase().includes(text.toLowerCase())
            })])
        }
    };
    const handleReset = () => {
        setCategoryIndex({ index: 0, category: categories[0] })
        setSortedCoffee([...CoffeeData])
        setSearchText('')
    };
    const flatRef = useRef(null);

    const getCart = async () => {
        let listCard = []
        try {
            const jsonValue = await AsyncStorage.getItem('listCart');
            if (jsonValue) {
                listCard = JSON.parse(jsonValue)
                console.log('mang gio hang: ', listCard)
            }
            else {
                let lst = []
                try {
                    const jsonValue = JSON.stringify(lst);
                    await AsyncStorage.setItem('listCart', jsonValue);
                } catch (e) {
                    // error reading value
                }
            }
        } catch (error) {

        }
    };
    const getHistory = async () => {
        let listHistory = []
        try {
            const jsonValue = await AsyncStorage.getItem('listHistory');
            if (jsonValue) {
                listHistory = JSON.parse(jsonValue)
                console.log('lich su mua hang: ', listHistory)
            }
            else {
                let lst = []
                try {
                    const jsonValue = JSON.stringify(lst);
                    await AsyncStorage.setItem('listHistory', jsonValue);
                } catch (e) {
                    // error reading value
                }
            }
        } catch (error) {

        }
    };
    const getListLiked = async () => {
        let listLiked = []
        try {
            const jsonValue = await AsyncStorage.getItem('listLiked');
            if (jsonValue) {
                listLiked = JSON.parse(jsonValue)
                console.log('mang yeu thich: ', listLiked)
            }
            else {
                let lst = []
                try {
                    const jsonValue = JSON.stringify(lst);
                    await AsyncStorage.setItem('listLiked', jsonValue);
                } catch (e) {
                    // error reading value
                }
            }
        } catch (error) {

        }
    }
    useFocusEffect(() => {
        getCart()
        getListLiked()
        getHistory()
    },)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'gray', flex: 1 }}>
            {/* header */}
            <HeaderBar />
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', paddingLeft: 20 }}>Find the best {'\n'}coffee for you</Text>
            {/* search */}
            <View style={{ flexDirection: 'row', backgroundColor: '#252A32', borderRadius: 15, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{}} onPress={() => handleSearch(searchText)}>
                    <Icon name='magnifying-glass' size={25} color={searchText.length > 0 ? '#D17842' : '#52555A'} style={{}} />
                </TouchableOpacity>
                <TextInput placeholder='Find your coffee' placeholderTextColor={'#52555A'} value={searchText} onChangeText={(text) => setSearchText(text)} style={{ height: 50, width: 300, marginHorizontal: 10, paddingLeft: 10, color: '#AEAEAE' }} />
                <TouchableOpacity onPress={() => handleReset()} style={{ height: 20, width: 20, }}>
                    <Icon name={'xmark'} size={20}></Icon>
                </TouchableOpacity>

            </View>
            {/* filter coffee */}

            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ marginLeft: 10 }}  >
                {
                    categories.map((item, i) => {
                        return (
                            <View style={{}} key={i}>
                                <TouchableOpacity
                                    onPress={() => {
                                        flatRef.current.scrollToIndex({
                                            index: 0,
                                            animated: true,
                                        });
                                        setCategoryIndex({ index: i, category: item });
                                        setSortedCoffee(getCoffeeList(item, CoffeeData));

                                    }}

                                    style={{ alignItems: 'center' }}
                                >
                                    <Text

                                        style={{ color: (categoryIndex.index == i) ? '#D17842' : 'white', margin: 10, fontSize: 18 }}>
                                        {item}
                                    </Text>
                                    {(categoryIndex.index == i) && < View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#D17842' }}></View>}

                                </TouchableOpacity>
                            </View>

                        )
                    })
                }
            </ScrollView>
            {/* coffee list*/
                <FlatList
                    ref={flatRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    ListEmptyComponent={<View style={{ height: 380, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', width: Dimensions.get('window').width }}>
                        <Text style={{ textAlign: 'center', fontSize: 26 }}>No coffee available</Text>
                    </View>}
                    data={sortedCoffee}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Details', item) }}
                            >

                                <Card
                                    item={item}
                                />
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            }
            {/* bean list  */}
            <Text style={{ marginLeft: 20, fontSize: 20, color: 'white' }}>Coffee Beans</Text>

            <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 60 }}
                horizontal
                data={BeansCoffe}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>

                            <Card
                                item={item}
                            />
                        </TouchableOpacity>
                    )
                }}
            >
            </FlatList>

            <StatusBar />
        </ScrollView>
    )
}


const styles = StyleSheet.create({})
export default HomeScreen