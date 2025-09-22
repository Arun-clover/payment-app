export interface Transaction {
  id: string;
  amount: number;
  type: 'sent' | 'received';
  timestamp: number;
  recipient?: string;
  sender?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Payment: undefined;
  History: undefined;
  PaymentSuccess: { amount: number; recipient: string };
};
