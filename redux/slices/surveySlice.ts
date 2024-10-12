import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Survey } from '~/data/surveys';
import { getTranslatedSurveys } from '~/helpers/translateSurveys';

interface Answer {
  surveyId: number;
  questionId: number;
  answer: string;
  timeSpent: number;
  timestamp: number;
}

interface SurveyState {
  surveys: Survey[];
  activeSurveyId: number | null;
  currentQuestionIndex: number;
  answers: Answer[];
  isSurveyStarted: boolean;
  remainingTime: number;
}

const initialState: SurveyState = {
  surveys: [],
  activeSurveyId: null,
  currentQuestionIndex: 0,
  answers: [],
  isSurveyStarted: false,
  remainingTime: 600,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveys(state, action: PayloadAction<Survey[]>) {
      state.surveys = getTranslatedSurveys(action.payload);
    },
    startSurvey(state, action: PayloadAction<number>) {
      state.activeSurveyId = action.payload;
      state.isSurveyStarted = true;
      state.currentQuestionIndex = 0;
      // state.answers = [];
      state.remainingTime = 600;
    },
    answerQuestion(state, action: PayloadAction<Answer>) {
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.surveyId === action.payload.surveyId && a.questionId === action.payload.questionId
      );
      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
    resetSurvey(state) {
      state.activeSurveyId = null;
      state.isSurveyStarted = false;
      state.currentQuestionIndex = 0;
      // state.answers = [];
      state.remainingTime = 600;
    },
    decrementTime(state) {
      state.remainingTime -= 1;
    },
  },
});

export const {
  setSurveys,
  startSurvey,
  answerQuestion,
  setCurrentQuestionIndex,
  resetSurvey,
  decrementTime,
} = surveySlice.actions;

export default surveySlice.reducer;
