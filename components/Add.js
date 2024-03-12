import { TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
const Add = ({ click }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => { click() }}
            style={{ backgroundColor: '#D17842', width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
        >
            <Icon name={'plus'} color={'white'} size={16} />
        </TouchableOpacity>
    )
}

export default Add