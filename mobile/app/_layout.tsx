import { Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { theme } from '../theme';

export default function RootLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </NativeBaseProvider>
  );
}

