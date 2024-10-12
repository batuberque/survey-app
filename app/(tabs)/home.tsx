import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { YStack, Text, Button, Card, Separator, useTheme } from 'tamagui';

import LanguageSwitch from '~/components/LanguageSwitch';
import ThemeSwitch from '~/components/ThemeSwitch';
import { useAppDispatch } from '~/redux/hook';
import { logout } from '~/redux/slices/authSlice';

const Home = memo(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const themeContext = useTheme();
  const theme = themeContext?.name;

  const primaryColor = theme === 'dark' ? '$gray10' : '$primary';
  const textColor = theme === 'dark' ? '$gray10' : '$primary';
  const backgroundColor = theme === 'dark' ? themeContext.background : '$gray1';

  const handleNavigateToSurveyStart = async () => {
    try {
      console.log('Butona tıklandı!');
      router.push('/survey');
    } catch (error) {
      console.error('Yönlendirme hatası:', error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Çıkış yapılıyor...');
      dispatch(logout());
      router.push('/(auth)');
    } catch (error) {
      console.error('Çıkış yapma hatası:', error);
    }
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      backgroundColor={backgroundColor}>
      <Card
        elevate
        bordered
        size="$6"
        padding="$6"
        width="90%"
        maxWidth={500}
        borderWidth={1}
        shadowColor="#888888"
        animation="bouncy">
        <YStack alignItems="center" space="$4">
          <Text fontWeight="900" fontSize="$9" color={primaryColor} marginBottom="$2">
            {t('welcome')}
          </Text>

          <Text fontSize="$6" color={textColor} marginBottom="$4" textAlign="center">
            {t('survey_intro')}
          </Text>

          <Separator my="$1" />

          <Button
            size="$7"
            backgroundColor="$gray6"
            color="$white"
            paddingHorizontal="$12"
            paddingVertical="$4"
            borderRadius="$10"
            shadowColor="#555555"
            onPress={handleNavigateToSurveyStart}
            hoverStyle={{
              scale: 1.05,
              shadowColor: '#000000',
            }}
            pressStyle={{
              scale: 0.97,
              shadowColor: '#000000',
            }}>
            <YStack flexDirection="row" alignItems="center" space="$2">
              <Ionicons name="chevron-forward-outline" size={24} color="white" />
              <Text fontWeight="700" fontSize="$7">
                {t('start_survey')}
              </Text>
            </YStack>
          </Button>

          <Button
            size="$7"
            backgroundColor="$gray6"
            color="$white"
            paddingHorizontal="$12"
            paddingVertical="$4"
            borderRadius="$10"
            shadowColor="#555555"
            width="100%"
            onPress={handleLogout}
            hoverStyle={{
              scale: 1.05,
              shadowColor: '#000000',
            }}
            pressStyle={{
              scale: 0.97,
              shadowColor: '#000000',
            }}>
            <YStack flexDirection="row" alignItems="center" space="$2">
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text fontWeight="700" fontSize="$7">
                {t('logout')}
              </Text>
            </YStack>
          </Button>
        </YStack>
      </Card>

      <YStack marginTop="$10" space="$6" alignItems="center">
        <LanguageSwitch />
        <ThemeSwitch />
      </YStack>
    </YStack>
  );
});

export default Home;
