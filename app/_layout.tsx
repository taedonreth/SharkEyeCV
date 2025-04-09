import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ProgressProvider } from '@/components/ProgressContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RalewayBold: require('../assets/fonts/Raleway-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <ProgressProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="overview" />
            <Stack.Screen name="page3" />
            <Stack.Screen name="page4" />
            <Stack.Screen name="page5" />
            <Stack.Screen name="page6" />
            <Stack.Screen name="page7" />
            <Stack.Screen name="page8" />
            <Stack.Screen name="page9" />
            <Stack.Screen name="page10" />
            <Stack.Screen name="page11" />
            <Stack.Screen name="page12" />
            <Stack.Screen name="page13" />
            <Stack.Screen name="page14" />
            <Stack.Screen name="page15" />
            <Stack.Screen name="page16" />
            <Stack.Screen name="page17" />
          </Stack>
        </ProgressProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
