import * as React from 'react'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './navigators/BottomTabs';
import { CardDetail, PaymentScreen } from './screen';
import Add from './components/Add';
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'BottomTabs'} component={BottomTabs}>
        </Stack.Screen>
        <Stack.Screen name={'Payment'} component={PaymentScreen}>
        </Stack.Screen>
        <Stack.Screen name={'Details'} component={CardDetail}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
    // <View style={{ flex: 1, paddingTop: 100 }}>
    //   <HomeScreen />
    // </View>
  );
}


