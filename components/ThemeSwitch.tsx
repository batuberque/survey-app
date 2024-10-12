import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { XStack, Text, Switch, YStack, useTheme } from 'tamagui';

import useThemeToggle from '~/hooks/useThemeToggle';

const ThemeSwitch: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeToggle();
  const themeContext = useTheme();

  const textColor = theme === 'dark' ? themeContext.blue11.val : themeContext.gray10.val;
  const thumbColor = theme === 'dark' ? themeContext.gray5.val : themeContext.gray2.val;
  const trackColor = theme === 'dark' ? themeContext.blue11.val : themeContext.gray5.val;

  return (
    <YStack alignItems="center" space="$4">
      <XStack alignItems="center" space="$3">
        <Ionicons name="moon" size={24} color={textColor} />
        <Text fontSize="$6" color={textColor}>
          {t('dark_mode')}
        </Text>
      </XStack>
      <Switch
        size="$4"
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        backgroundColor={trackColor}>
        <Switch.Thumb animation="bouncy" backgroundColor={thumbColor} />
      </Switch>
    </YStack>
  );
};

export default ThemeSwitch;
