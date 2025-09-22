import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '../contexts/AppContext';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { balance } = useAppContext();

  const handlePaymentPress = () => {
    navigation.navigate('Payment');
  };

  const handleHistoryPress = () => {
    navigation.navigate('History');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handlePaymentPress}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
            <MaterialIcons name="payment" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleHistoryPress}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
            <MaterialIcons name="history" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentTransactions}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={handleHistoryPress}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {/* Recent transactions list would go here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceContainer: {
    backgroundColor: '#6200ee',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionText: {
    color: '#333',
    fontSize: 14,
  },
  recentTransactions: {
    backgroundColor: 'white',
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#6200ee',
    fontSize: 14,
  },
});

export default HomeScreen;
