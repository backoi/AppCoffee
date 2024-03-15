import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PaymentMode from '../components/PaymentMode'
import GradientIcon from '../components/GradientIcon'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PaymentScreen = ({ navigation, route }) => {
    const today = new Date()
    const uniqueID = UUID.randomUUID().toString();
    var date = today.getHours() + ":" + today.getMinutes() + ' ' + today.getDate() + '/' + (today.getMonth() + 1);
    //console.log(date)

    const item = route.params.lstCart
    //console.log(item)
    const total = route.params.total
    const listPayments = [
        {
            name: 'Wallet',
            icon: require('../assets/imgs/logo/wallet.png')
        },
        {
            name: 'Google Pay',
            icon: require('../assets/imgs/logo/ggpay.png')
        },
        {
            name: 'Apple Pay',
            icon: require('../assets/imgs/logo/apple.png')
        },
        {
            name: 'Amazon Pay',
            icon: require('../assets/imgs/logo/amazon.png')
        },
    ]
    const [paymentMode, setPaymentMode] = useState('')
    const handlePayment = async () => {
        if (paymentMode == '') {
            ToastAndroid.show('Please select payment method!', ToastAndroid.SHORT);
        }
        else {
            const empty = []
            try {
                const history = await AsyncStorage.getItem('listHistory')
                let lst = JSON.parse(history)
                lst.push({ items: item, method: paymentMode, timeOrder: date, total: total, key: uniqueID })
                const jsonValue = JSON.stringify(lst);
                await AsyncStorage.setItem('listHistory', jsonValue);
                //console.log('lich su mua', lst)
                await AsyncStorage.setItem('listCart', JSON.stringify(empty));
            } catch (error) {

            }
        }
    }

    return (
        //khi click thanh toan luu du lieu vao store de su dung ben history
        <View style={{ backgroundColor: '#52555A', flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginBottom: 50 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                    <GradientIcon name={'angle-left'} size={25} width={30} height={30} />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 25, marginRight: 10, fontWeight: 'bold' }}>Payment</Text>
                <View />
            </View>
            {
                listPayments.map(item => {
                    return (
                        <TouchableOpacity onPress={() => setPaymentMode(item.name)}>
                            <PaymentMode mode={paymentMode} name={item.name} icon={item.icon}></PaymentMode>
                        </TouchableOpacity>
                    )
                })
            }
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 70, justifyContent: 'space-evenly', width: '100%' }}>
                <View >
                    <Text style={{ color: 'white', }}>Price</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#D17842', fontSize: 20, fontWeight: 'bold', marginRight: 5 }}>$</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 5 }}>{total}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => handlePayment()} style={{ width: '70%', height: 50, backgroundColor: '#D17842', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{`Pay from ${paymentMode}`}</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default PaymentScreen

