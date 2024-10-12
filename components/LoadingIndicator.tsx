import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, YStack } from 'tamagui';

const LoadingIndicator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <YStack flex={1} padding="$4" space="$4" justifyContent="center" alignItems="center">
      <Text fontSize="$6" textAlign="center">
        {t('loading')}
      </Text>
    </YStack>
  );
};

export default React.memo(LoadingIndicator);
