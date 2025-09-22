import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types';

interface AppContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  updateBalance: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BALANCE: '@FingerPay:balance',
  TRANSACTIONS: '@FingerPay:transactions',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedBalance, savedTransactions] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.BALANCE),
          AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS),
        ]);

        if (savedBalance) {
          setBalance(parseFloat(savedBalance));
        } else {
          // Initial balance
          setBalance(1000);
          await AsyncStorage.setItem(STORAGE_KEYS.BALANCE, '1000');
        }

        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const updateBalance = async (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    await AsyncStorage.setItem(STORAGE_KEYS.BALANCE, newBalance.toString());
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    
    // Update balance based on transaction type
    const amount = transaction.type === 'received' 
      ? transaction.amount 
      : -transaction.amount;
    
    updateBalance(amount);
    
    await AsyncStorage.setItem(
      STORAGE_KEYS.TRANSACTIONS, 
      JSON.stringify(updatedTransactions)
    );
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AppContext.Provider value={{ balance, transactions, addTransaction, updateBalance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
