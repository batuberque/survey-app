import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, YStack, Button, Card } from 'tamagui';

interface SurveyCardProps {
  title: string;
  description: string;
  onPress: () => void;
  buttonText?: string;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ title, description, onPress, buttonText }) => {
  const { t } = useTranslation();

  return (
    <Card padding="$4" borderRadius="$4" elevation="$2" onPress={onPress}>
      <YStack space="$2">
        <Text fontSize="$7" fontWeight="600">
          {t(title)}
        </Text>
        <Text fontSize="$6" color="$gray11">
          {t(description)}
        </Text>
        <Button backgroundColor="$gray6" onPress={onPress}>
          <Text color="$white" fontSize="$6">
            {buttonText}
          </Text>
        </Button>
      </YStack>
    </Card>
  );
};

export default React.memo(SurveyCard);
