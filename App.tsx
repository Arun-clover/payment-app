import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

export default function App() {
  const [loaded] = useFonts({
    // You can add custom fonts here if needed
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // The actual layout and navigation is now handled in app/_layout.tsx
  return null;
}
