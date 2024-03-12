import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
const clearAsyncStorage = async () => {
    AsyncStorage.clear();
};


const ProfilePic = () => {
    return (
        <TouchableOpacity onPress={() => clearAsyncStorage()} style={{}}>
            <Image source={require('../assets/imgs/avt.png')} style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }} >

            </Image>
        </TouchableOpacity>
    )
}

export default ProfilePic

