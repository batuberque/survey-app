import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Text, Button, YStack, useTheme, TextArea, Card, ScrollView, XStack } from 'tamagui';

import LoadingIndicator from '~/components/LoadingIndicator';
import Timer from '~/components/Timer';
import useSurvey from '~/hooks/useSurvey';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { answerQuestion, setCurrentQuestionIndex } from '~/redux/slices/surveySlice';
import { RootState } from '~/redux/store';

const SurveyQuestion: React.FC = () => {
  const { surveyId, questionId } = useLocalSearchParams<{ surveyId: string; questionId: string }>();
  const sId = parseInt(surveyId || '1', 10);
  const qId = parseInt(questionId || '1', 10);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();

  const { isSurveyStarted, remainingTime, answers, activeSurveyId } = useAppSelector(
    (state: RootState) => state.survey
  );

  const currentSurvey = useSurvey(sId);
  const currentQuestion = useMemo(
    () => currentSurvey?.questions.find((q) => q.id === qId),
    [currentSurvey, qId]
  );

  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    if (!isSurveyStarted || activeSurveyId !== sId || !currentQuestion) {
      router.replace('/survey');
    } else {
      setQuestionStartTime(Date.now());
      dispatch(setCurrentQuestionIndex(qId - 1));
    }
  }, [isSurveyStarted, sId, qId, activeSurveyId, currentQuestion, dispatch, router]);

  useEffect(() => {
    if (remainingTime <= 0) {
      router.replace(`/survey/${sId}/result`);
    }
  }, [remainingTime, sId, router]);

  const loadExistingAnswer = useCallback(() => {
    const existingAnswer = answers.find((a) => a.surveyId === sId && a.questionId === qId);
    setSelectedAnswer(existingAnswer?.answer || '');
  }, [answers, sId, qId]);

  useEffect(() => {
    loadExistingAnswer();
  }, [loadExistingAnswer]);

  const saveAnswer = useCallback(
    (answer: string) => {
      const timeSpent = (Date.now() - questionStartTime) / 1000;
      dispatch(
        answerQuestion({
          surveyId: sId,
          questionId: qId,
          answer,
          timeSpent,
          timestamp: Date.now(),
        })
      );
    },
    [dispatch, sId, qId, questionStartTime]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion?.type === 'open-ended' && !selectedAnswer.trim()) {
      return;
    }
    saveAnswer(selectedAnswer);
    const nextQId = qId + 1;
    if (nextQId > (currentSurvey?.questions.length || 0)) {
      router.replace(`/survey/${sId}/result`);
    } else {
      router.push(`/survey/${sId}/${nextQId}`);
    }
  }, [currentQuestion, saveAnswer, selectedAnswer, qId, currentSurvey, sId, router]);

  const handlePrevious = useCallback(() => {
    saveAnswer(selectedAnswer);
    const prevQId = qId - 1;
    if (prevQId >= 1) {
      router.push(`/survey/${sId}/${prevQId}`);
    }
  }, [saveAnswer, selectedAnswer, qId, sId, router]);

  if (!currentSurvey || !currentQuestion) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView flex={1} padding="$4" backgroundColor={theme.background}>
      <YStack space="$4">
        <Timer />
        <Card
          width="auto"
          padding="$2"
          backgroundColor="$backgroundContrast"
          borderRadius="$2"
          elevation="$1">
          <Text fontSize="$6" fontWeight="700" color="black">
            Soru {qId} / {currentSurvey.questions.length}
          </Text>
        </Card>
        <Card
          width="100%"
          padding="$4"
          borderRadius="$4"
          backgroundColor={theme.backgroundStrong}
          elevation="$2">
          <Text fontSize="$7" fontWeight="600" textAlign="center" marginBottom="$4">
            {currentQuestion.questionText}
          </Text>
          {currentQuestion.type === 'multiple-choice' && (
            <YStack space="$3">
              {currentQuestion.options!.map((option) => (
                <Button
                  key={option}
                  size="$6"
                  backgroundColor={selectedAnswer === option ? '$gray6' : '$backgroundTertiary'}
                  borderRadius="$4"
                  onPress={() => setSelectedAnswer(option)}>
                  <Text color={selectedAnswer === option ? '$white' : '$color'} fontSize="$6">
                    {option}
                  </Text>
                </Button>
              ))}
            </YStack>
          )}
          {currentQuestion.type === 'rating' && (
            <XStack space="$2" justifyContent="center" alignItems="center" marginTop="$2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  size="$2"
                  width="$5"
                  height="$5"
                  backgroundColor={
                    selectedAnswer === rating.toString() ? '$gray6' : '$backgroundTertiary'
                  }
                  onPress={() => setSelectedAnswer(rating.toString())}>
                  <Text
                    color={selectedAnswer === rating.toString() ? '$white' : '$color'}
                    fontSize="$6">
                    {rating}
                  </Text>
                </Button>
              ))}
            </XStack>
          )}
          {currentQuestion.type === 'open-ended' && (
            <TextArea
              value={selectedAnswer}
              onChangeText={setSelectedAnswer}
              placeholder="Cevabınızı yazın..."
              borderWidth={1}
              borderColor="$gray5"
              borderRadius="$4"
              padding="$3"
              height={150}
              textAlignVertical="top"
            />
          )}
        </Card>
        <XStack justifyContent="space-between" marginTop="$4">
          <Button
            disabled={qId === 1}
            onPress={handlePrevious}
            backgroundColor={qId === 1 ? '$gray5' : '$gray6'}
            flex={1}
            marginRight="$2">
            <Text color="$white" fontSize="$6">
              Geri
            </Text>
          </Button>
          <Button onPress={handleNext} backgroundColor="$gray6" flex={1} marginLeft="$2">
            <Text color="$white" fontSize="$6">
              {qId === currentSurvey.questions.length ? 'Bitir' : 'İleri'}
            </Text>
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
  );
};

export default SurveyQuestion;
