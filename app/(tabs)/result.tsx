import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, YStack, ScrollView } from 'tamagui';

import LoadingIndicator from '~/components/LoadingIndicator';
import SurveyCard from '~/components/SurveyCard';
import useCompletedSurveys from '~/hooks/useCompletedSurveys';

const ResultsList: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const completedSurveys = useCompletedSurveys();

  const handleViewResult = React.useCallback(
    (surveyId: number) => {
      router.push(`/survey/${surveyId}/result`);
    },
    [router]
  );

  if (completedSurveys === null) {
    return <LoadingIndicator />;
  }

  return (
    <YStack flex={1} padding="$4" space="$4">
      <Text fontSize="$8" fontWeight="700" textAlign="center">
        Anket Sonuçları
      </Text>
      {completedSurveys.length === 0 ? (
        <Text fontSize="$6" textAlign="center">
          {t('noCompletedSurveys')}
        </Text>
      ) : (
        <ScrollView flex={1}>
          <YStack space="$4">
            {completedSurveys.map((survey) => (
              <SurveyCard
                key={survey.id}
                title={survey.title}
                description={survey.description}
                onPress={() => handleViewResult(survey.id)}
                buttonText="Sonuçları Gör"
              />
            ))}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default ResultsList;
