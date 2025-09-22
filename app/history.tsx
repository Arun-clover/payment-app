import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { Transaction } from '../types';
import { format } from 'date-fns';

export default function HistoryScreen() {
  const { transactions } = useAppContext();

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const isReceived = item.type === 'received';
    const amountColor = isReceived ? '#4CAF50' : '#F44336';
    const prefix = isReceived ? '+' : '-';

    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: isReceived ? '#E8F5E9' : '#FFEBEE' }]}>
          <Text style={{ color: amountColor, fontWeight: 'bold' }}>
            {isReceived ? '↓' : '↑'}
          </Text>
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>
            {isReceived ? `Received from ${item.sender || 'Unknown'}` : `Paid to ${item.recipient || 'Unknown'}`}
          </Text>
          <Text style={styles.transactionDate}>
            {format(new Date(item.timestamp), 'MMM d, yyyy h:mm a')}
          </Text>
        </View>
        <Text style={[styles.amount, { color: amountColor }]}>
          {prefix}${item.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySubtext}>Your transactions will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: 'white',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listContent: {
    padding: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
