import { ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

const CardFav = ({ item }) => {
    //console.log(item.prices[0].price)
    return (
        <View style={{ margin: 20 }}>
            <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#0C0F14', '#52555A']} style={{ borderRadius: 30, flexDirection: 'row' }}>
                <View>

                    <ImageBackground resizeMode='cover' source={item.imagelink_square} imageStyle={{ borderRadius: 30 }}
                        style={{
                            width: 120, height: 120, marginHorizontal: 40, marginVertical: 20
                        }}>
                    </ImageBackground>
                </View>

                <View style={{}}>
                    <Text style={{ color: 'white', marginTop: 20, fontSize: 25 }}>{item.name}
                    </Text>
                    <Text style={{ color: 'white', marginVertical: 10 }}>{item.special_ingredient}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#D17842' }}>$ <Text style={{ color: 'white' }}>{item.prices[2].price}
                        </Text></Text>

                    </View>
                </View>
            </LinearGradient>
        </View >
    )
}

export default CardFav
