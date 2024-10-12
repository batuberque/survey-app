import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { Suspense, useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import '../i18n';
import config from '../tamagui.config';
import { ReduxProvider } from './providers';

import LoadingIndicator from '~/components/LoadingIndicator';
import { useAppSelector } from '~/redux/hook';
import { RootState } from '~/redux/store';

const Layout: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const theme = useAppSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    async function handleSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      } else {
        await SplashScreen.preventAutoHideAsync();
      }
    }
    handleSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <TamaguiProvider config={config} defaultTheme="light">
        <Theme name={theme}>
          <Stack screenOptions={{ headerShown: false }} />
        </Theme>
      </TamaguiProvider>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <ReduxProvider>
      <Layout />
    </ReduxProvider>
  );
};

export default App;
