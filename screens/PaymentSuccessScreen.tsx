import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentSuccessScreen = () => {
  type PaymentSuccessRouteProp = RouteProp<RootStackParamList, 'PaymentSuccess'>;
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PaymentSuccessRouteProp>();
  const { amount, recipient } = route.params;

  useEffect(() => {
    // Play success sound or haptic feedback
    // You can add this if needed
  }, []);

  const handleDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.successText}>Payment Successful!</Text>
        
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        
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
        
        <TouchableOpacity 
          style={styles.receiptButton}
          onPress={() => {}}
        >
          <Text style={styles.receiptButtonText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  amount: {
    fontSize: 32,
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
    marginBottom: 15,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  receiptButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  receiptButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PaymentSuccessScreen;
