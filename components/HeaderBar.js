import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GradientIcon from './GradientIcon'
import ProfilePic from './ProfilePic'

const HeaderBar = ({ name }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 }} >
            <GradientIcon name='table-cells-large' size={20} height={30} width={30}></GradientIcon>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{name}</Text>
            <ProfilePic></ProfilePic>
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})