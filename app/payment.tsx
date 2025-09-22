import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAppContext } from '../contexts/AppContext';
import { router } from 'expo-router';

export default function PaymentScreen() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  
  const { balance, addTransaction } = useAppContext();

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
    
    checkBiometricSupport();
  }, []);

  const handlePayment = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (!recipient.trim()) {
      Alert.alert('Recipient Required', "Please enter recipient's name");
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (paymentAmount > balance) {
      Alert.alert('Insufficient Funds', 'You do not have enough balance for this transaction');
      return;
    }

    try {
      setIsLoading(true);
      
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to complete payment',
        fallbackLabel: 'Enter passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        await addTransaction({
          amount: paymentAmount,
          type: 'sent',
          recipient: recipient.trim(),
        });

        router.push({
          pathname: '/payment-success',
          params: { 
            amount: paymentAmount,
            recipient: recipient.trim()
          }
        });
      } else {
        Alert.alert('Authentication Failed', 'Payment was not authorized');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'An error occurred while processing your payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount ($)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          editable={!isLoading}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Recipient</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's name"
          value={recipient}
          onChangeText={setRecipient}
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.payButton, isLoading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.payButtonText}>
            {isBiometricSupported ? 'Authenticate to Pay' : 'Confirm Payment'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  payButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonDisabled: {
    backgroundColor: '#9e9e9e',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
