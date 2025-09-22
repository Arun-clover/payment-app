import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/types';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAppContext } from '../contexts/AppContext';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  
  const navigation = useNavigation<NavigationProps>();
  const { balance, addTransaction } = useAppContext();

  useEffect(() => {
    // Check if device supports biometric authentication
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
      Alert.alert('Recipient Required', 'Please enter recipient\'s name');
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (paymentAmount > balance) {
      Alert.alert('Insufficient Funds', 'You do not have enough balance for this transaction');
      return;
    }

    try {
      setIsLoading(true);
      
      // Authenticate with fingerprint
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to complete payment',
        fallbackLabel: 'Enter passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Add transaction to history
        await addTransaction({
          amount: paymentAmount,
          type: 'sent',
          recipient: recipient.trim(),
        });

        // Navigate to success screen
        navigation.navigate('PaymentSuccess', { 
          amount: paymentAmount, 
          recipient: recipient.trim() 
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
          <View style={styles.payButtonContent}>
            <MaterialIcons name="fingerprint" size={24} color="white" />
            <Text style={styles.payButtonText}>
              {isBiometricSupported ? 'Authenticate to Pay' : 'Confirm Payment'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          {isBiometricSupported 
            ? 'Note: Your fingerprint will be used to authenticate this payment.'
            : 'Note: Biometric authentication is not available on this device.'}
        </Text>
      </View>
    </View>
  );
};

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
  payButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noteContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  noteText: {
    color: '#0d47a1',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PaymentScreen;
