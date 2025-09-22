import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { amount, recipient } = useLocalSearchParams<{
    amount: string;
    recipient: string;
  }>();

  useEffect(() => {
    // Play success sound or haptic feedback
    // You can add this if needed
  }, []);

  const handleDone = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        
        <Text style={styles.successText}>Payment Successful!</Text>
        
        <Text style={styles.amount}>${amount}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Paid to:</Text>
            <Text style={styles.detailValue}>{recipient}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID:</Text>
            <Text style={styles.detailValue}>
              {`TXN${Date.now().toString().slice(-8)}`}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  doneButton: {
    backgroundColor: '#6200ee',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
