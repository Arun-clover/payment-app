import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'FingerPay' }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen} 
          options={{ title: 'Make Payment' }}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Transaction History' }}
        />
        <Stack.Screen 
          name="PaymentSuccess" 
          component={PaymentSuccessScreen} 
          options={{ title: 'Payment Successful', headerBackVisible: false }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;
