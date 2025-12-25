'use client';

import { NativeBaseProvider } from 'native-base';
import { theme } from '../theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NativeBaseProvider theme={theme}>
      {children}
    </NativeBaseProvider>
  );
}

