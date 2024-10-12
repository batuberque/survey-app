import { useMemo } from 'react';

import { Survey } from '~/data/surveys';
import { useAppSelector } from '~/redux/hook';
import { RootState } from '~/redux/store';

const useSurvey = (surveyId: number): Survey | undefined => {
  const surveys = useAppSelector((state: RootState) => state.survey.surveys);
  return useMemo(() => surveys.find((s) => s.id === surveyId), [surveys, surveyId]);
};

export default useSurvey;
