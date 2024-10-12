import { useMemo } from 'react';

import { Survey } from '~/data/surveys';
import { useAppSelector } from '~/redux/hook';
import { RootState } from '~/redux/store';

const useCompletedSurveys = (): Survey[] | null => {
  const { surveys, answers } = useAppSelector((state: RootState) => state.survey);

  return useMemo(() => {
    if (!surveys || !answers) return null;

    return surveys.filter((survey) => {
      const surveyAnswers = answers.filter((a) => a.surveyId === survey.id);
      return survey.questions.every((q) => surveyAnswers.some((a) => a.questionId === q.id));
    });
  }, [surveys, answers]);
};

export default useCompletedSurveys;
