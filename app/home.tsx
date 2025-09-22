import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FingerPay</Text>
      <View style={styles.links}>
        <Link href="/payment" style={styles.link}>
          <Text style={styles.linkText}>Make a Payment</Text>
        </Link>
        <Link href="/history" style={styles.link}>
          <Text style={styles.linkText}>View History</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  links: {
    width: '100%',
    maxWidth: 300,
  },
  link: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
