import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Payment: undefined;
  History: undefined;
  PaymentSuccess: { amount: number; recipient: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
