import i18n from '../i18n';

import { Survey } from '~/data/surveys';

export const getTranslatedSurveys = (surveys: Survey[]): Survey[] => {
  return surveys.map((survey) => ({
    ...survey,
    title: i18n.t(survey.title),
    description: i18n.t(survey.description),
    questions: survey.questions.map((question) => ({
      ...question,
      questionText: i18n.t(question.questionText),
      options: question.options ? question.options.map((option) => i18n.t(option)) : undefined,
    })),
  }));
};
