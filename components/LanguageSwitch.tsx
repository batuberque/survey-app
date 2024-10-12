import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { XStack, Text, Switch, YStack, useTheme } from 'tamagui';

import useLanguageToggle from '~/hooks/useLanguageToggle';

const LanguageSwitch: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguageToggle();
  const themeContext = useTheme();

  const isTurkish = language === 'tr';
  const textColor = isTurkish ? themeContext.blue11.val : themeContext.gray10.val;
  const thumbColor = isTurkish ? themeContext.gray5.val : themeContext.gray2.val;
  const trackColor = isTurkish ? themeContext.blue11.val : themeContext.gray5.val;

  return (
    <YStack alignItems="center" space="$4">
      <XStack alignItems="center" space="$3">
        <Ionicons name="language" size={24} color={textColor} />
        <Text fontSize="$6" color={textColor}>
          {t('language')}: {language.toUpperCase()}
        </Text>
      </XStack>
      <Switch
        size="$4"
        checked={isTurkish}
        onCheckedChange={toggleLanguage}
        backgroundColor={trackColor}>
        <Switch.Thumb animation="bouncy" backgroundColor={thumbColor} />
      </Switch>
    </YStack>
  );
};

export default LanguageSwitch;
