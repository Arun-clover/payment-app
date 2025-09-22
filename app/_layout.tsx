import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Stack
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
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen 
            name="home" 
            options={{ 
              title: 'FingerPay',
              headerBackVisible: false
            }} 
          />
          <Stack.Screen 
            name="payment" 
            options={{ title: 'Make Payment' }} 
          />
          <Stack.Screen 
            name="history" 
            options={{ title: 'Transaction History' }} 
          />
          <Stack.Screen 
            name="payment-success" 
            options={{ 
              title: 'Payment Successful',
              headerBackVisible: false
            }} 
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
