import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useEffect, useCallback } from 'react';
import { Text, YStack, Button, Card, ScrollView, H3, Paragraph } from 'tamagui';

import LoadingIndicator from '~/components/LoadingIndicator';
import useSurvey from '~/hooks/useSurvey';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { resetSurvey } from '~/redux/slices/surveySlice';
import { RootState } from '~/redux/store';

const SurveyResult: React.FC = () => {
  const { surveyId } = useLocalSearchParams<{ surveyId: string }>();
  const sId = parseInt(surveyId || '1', 10);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const currentSurvey = useSurvey(sId);
  const answers = useAppSelector((state: RootState) => state.survey.answers);

  useEffect(() => {
    if (!currentSurvey) {
      router.replace('/survey');
    }
  }, [currentSurvey, router]);

  const surveyAnswers = useMemo(() => answers.filter((a) => a.surveyId === sId), [answers, sId]);
  const totalTimeSpent = useMemo(
    () => surveyAnswers.reduce((acc, answer) => acc + answer.timeSpent, 0),
    [surveyAnswers]
  );
  const averageTimePerQuestion = useMemo(
    () => totalTimeSpent / (surveyAnswers.length || 1),
    [totalTimeSpent, surveyAnswers.length]
  );

  const handleRestart = useCallback(() => {
    dispatch(resetSurvey());
    router.replace('/survey');
  }, [dispatch, router]);

  if (!currentSurvey) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView flex={1} padding="$4">
      <YStack alignItems="center" marginBottom="$4">
        <H3 fontWeight="700">Anket Sonuçları</H3>
        <YStack space="$2" alignItems="center" marginTop="$2">
          <Paragraph fontSize="$6">Toplam Harcanan Süre: {totalTimeSpent.toFixed(2)} sn</Paragraph>
          <Paragraph fontSize="$6">
            Soru Başına Ortalama Süre: {averageTimePerQuestion.toFixed(2)} sn
          </Paragraph>
        </YStack>
      </YStack>

      {currentSurvey.questions.map((question) => {
        const answer = surveyAnswers.find((a) => a.questionId === question.id);
        return (
          <Card
            key={question.id}
            padding="$4"
            borderRadius="$4"
            backgroundColor="$backgroundStrong"
            elevation="$2"
            marginBottom="$4">
            <YStack space="$2">
              <Text fontSize="$6" fontWeight="600">
                {question.questionText}
              </Text>
              <Text fontSize="$6">Cevabınız: {answer?.answer || 'Cevaplanmadı'}</Text>
              <Text fontSize="$6">
                Harcanan Süre: {answer ? answer.timeSpent.toFixed(2) : '0'} sn
              </Text>
              <Text fontSize="$6">
                Cevap Zamanı: {answer ? new Date(answer.timestamp).toLocaleString() : '—'}
              </Text>
            </YStack>
          </Card>
        );
      })}

      <Button backgroundColor="$gray6" marginTop="$4" marginBottom="$10" onPress={handleRestart}>
        <Text color="$white" fontSize="$6">
          Anketlere Dön
        </Text>
      </Button>
    </ScrollView>
  );
};

export default SurveyResult;
