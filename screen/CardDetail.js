import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientIcon from '../components/GradientIcon'
import Icon from 'react-native-vector-icons/FontAwesome6'

const CardDetail = ({ navigation, route }) => {
    const coffees = route.params;
    const [liked, setLiked] = useState(false);
    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    };
    const addToListLiked = async () => {
        listCf = await AsyncStorage.getItem('listLiked')
        listCf = JSON.parse(listCf)
        if (listCf) {
            if (liked) {
                const a = listCf.filter(item => {
                    return item != coffees.id
                })
                try {
                    const jsonValue = JSON.stringify(a);
                    await AsyncStorage.setItem('listLiked', jsonValue);
                    setLiked(false)
                    console.log('mang sau khi bo tym      : ', a)
                } catch (e) {
                    // saving error
                }
            }
            else {
                listCf.push(coffees.id)
                try {
                    const jsonValue = JSON.stringify(listCf);
                    await AsyncStorage.setItem('listLiked', jsonValue);
                    setLiked(true)
                    console.log('mang sau khi add tym     : ', listCf)
                } catch (e) {
                    // saving error
                }
            }
        }
        // else {
        //     let lst = []
        //     try {
        //         const jsonValue = JSON.stringify(lst);
        //         await AsyncStorage.setItem('listLiked', jsonValue);
        //     } catch (e) {
        //         // error reading value
        //     }
        // }
    };
    const setLike = async () => {
        let listliked = []
        try {
            const jsonValue = await AsyncStorage.getItem('listLiked');
            if (jsonValue) {
                listliked = JSON.parse(jsonValue)
                listliked.map((item) => {
                    if (item == coffees.id) {
                        setLiked(true)
                    }
                })
            }
            // else {
            //     let lst = []
            //     try {
            //         const jsonValue = JSON.stringify(lst);
            //         await AsyncStorage.setItem('listLiked', jsonValue);
            //     } catch (e) {
            //         // error reading value
            //     }
            // }

        } catch (e) {
            // error reading value
        }
    };
    useEffect(() => {
        //console.log('effect lan moi')
        setLike()
    }, []);
    const [sizes, setSizes] = useState([
        {
            name: coffees.prices[0].size,
            isSelected: false,
            price: coffees.prices[0].price
        },
        {
            name: coffees.prices[1].size,
            isSelected: false,
            price: coffees.prices[1].price
        },
        {
            name: coffees.prices[2].size,
            isSelected: false,
            price: coffees.prices[2].price
        }
    ]
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#0C0F14' }}>
            <ImageBackground resizeMode='cover' source={coffees.imagelink_square} style={{ aspectRatio: 20 / 25, justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 40, left: 180 }}>
                    <TouchableOpacity style={{ right: 150 }} onPress={() => navigation.goBack()}>
                        <GradientIcon name={'angle-left'} size={15} height={30} width={30}></GradientIcon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { addToListLiked() }} style={{ left: 150 }}>
                        <GradientIcon name={'heart'} size={15} color={(liked) ? 'red' : 'black'} height={30} width={30} ></GradientIcon>

                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 10, flexDirection: 'row' }}>

                    <View style={{ flex: 1, marginLeft: 30, justifyContent: 'space-evenly' }}>
                        <Text style={{
                            color: 'white', fontWeight: 'bold',
                            fontSize: 20
                        }}>{coffees.name}
                        </Text>
                        <Text style={{
                            color: 'gray',
                            fontSize: 18,
                        }}>{coffees.special_ingredient}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name={'star'} size={15} color={'#D17842'}></Icon>
                            <Text style={{ color: 'white' }}> 4.5</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginRight: 40, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: '#0C0F14', width: 70, height: 70, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'seedling'} size={22} color={'#D17842'}></Icon>
                                <Text style={{ color: 'gray' }}>Coffee</Text>
                            </View>
                            <View style={{ backgroundColor: '#0C0F14', width: 70, height: 70, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'droplet'} size={22} color={'#D17842'}></Icon>
                                <Text style={{ color: 'gray' }}>Milk</Text>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#0C0F14', width: '100%', height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                            <Text style={{ color: 'gray', fontSize: 20, padding: 10 }}>Medium Roested</Text>
                        </View>
                    </View>
                </View>

            </ImageBackground >

            <View style={{ flex: 1, marginHorizontal: 15 }}>
                <View style={{ backgroundColor: '#0C0F14', marginTop: 5 }}>
                    <Text style={{ color: 'gray', fontSize: 18 }}>Description</Text>
                    <Text style={{ color: 'white', marginTop: 10 }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                </View>
                <View style={{ backgroundColor: '#0C0F14', marginTop: 10 }}>
                    <Text style={{ color: 'gray', fontSize: 18 }}>Size</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        {
                            sizes.map((item, i) => {
                                return (
                                    <TouchableOpacity key={i}
                                        style={{
                                            borderRadius: 12, backgroundColor: '#252A32',
                                            paddingHorizontal: 50, paddingVertical: 10, borderWidth: 2, borderColor: (item.isSelected) ? '#D17842' : 'gray'
                                        }} onPress={() => {
                                            const newSizes = sizes.map((each) => {
                                                return {
                                                    ...each,
                                                    isSelected: each.name == item.name
                                                }
                                            },
                                            )
                                            setSizes(newSizes)
                                        }}>

                                        <Text style={{ color: 'white' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })


                        }
                    </View>
                </View>
                <View style={{ backgroundColor: '#0C0F14', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                    <View style={{ backgroundColor: '#0C0F14', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'gray', fontSize: 18 }}>Price</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#D17842', marginHorizontal: 5 }}>$</Text>
                            <Text style={{ color: 'white' }}>{
                                sizes.map(item => {
                                    if (item.isSelected == true)
                                        return item.price
                                })
                            }</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: '70%', height: 50, backgroundColor: '#D17842', justifyContent: 'center', alignItems: 'center', borderRadius: 12, }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View >
    )

}
export default CardDetail
