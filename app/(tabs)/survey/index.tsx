import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useCallback } from 'react';
import { Text, YStack, ScrollView } from 'tamagui';

import LoadingIndicator from '~/components/LoadingIndicator';
import SurveyCard from '~/components/SurveyCard';
import { surveys as initialSurveys } from '~/data/surveys';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { setSurveys, startSurvey } from '~/redux/slices/surveySlice';
import { RootState } from '~/redux/store';

const SurveyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const surveyList = useAppSelector((state: RootState) => state.survey.surveys || []);

  useEffect(() => {
    if (surveyList.length === 0) {
      dispatch(setSurveys(initialSurveys));
    }
  }, [dispatch, surveyList.length]);

  const handleSurveyPress = useCallback(
    (surveyId: number) => {
      dispatch(startSurvey(surveyId));
      router.push(`/survey/${surveyId}/1`);
    },
    [dispatch, router]
  );

  const surveyCards = useMemo(() => {
    return surveyList.map((survey) => (
      <SurveyCard
        key={survey.id}
        title={survey.title}
        description={survey.description}
        onPress={() => handleSurveyPress(survey.id)}
        buttonText="Ankete Başla"
      />
    ));
  }, [surveyList, handleSurveyPress]);

  if (surveyList.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView>
      <YStack flex={1} padding="$4" space="$4">
        <Text fontSize="$8" fontWeight="700" textAlign="center">
          Anketler
        </Text>
        <YStack space="$4">{surveyCards}</YStack>
      </YStack>
    </ScrollView>
  );
};

export default SurveyList;
