export interface Question {
  id: number;
  questionText: string;
  type: 'multiple-choice' | 'rating' | 'open-ended';
  options?: string[];
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export const surveys: Survey[] = [
  {
    id: 1,
    title: 'survey.customerSatisfaction.title',
    description: 'survey.customerSatisfaction.description',
    questions: [
      {
        id: 1,
        questionText: 'survey.customerSatisfaction.questions.1.questionText',
        type: 'rating',
      },
      {
        id: 2,
        questionText: 'survey.customerSatisfaction.questions.2.questionText',
        type: 'multiple-choice',
        options: [
          'survey.customerSatisfaction.questions.2.options.1',
          'survey.customerSatisfaction.questions.2.options.2',
          'survey.customerSatisfaction.questions.2.options.3',
        ],
      },
      {
        id: 3,
        questionText: 'survey.customerSatisfaction.questions.3.questionText',
        type: 'open-ended',
      },
      {
        id: 4,
        questionText: 'survey.customerSatisfaction.questions.4.questionText',
        type: 'rating',
      },
      {
        id: 5,
        questionText: 'survey.customerSatisfaction.questions.5.questionText',
        type: 'multiple-choice',
        options: [
          'survey.customerSatisfaction.questions.5.options.1',
          'survey.customerSatisfaction.questions.5.options.2',
          'survey.customerSatisfaction.questions.5.options.3',
          'survey.customerSatisfaction.questions.5.options.4',
        ],
      },
      {
        id: 6,
        questionText: 'survey.customerSatisfaction.questions.6.questionText',
        type: 'open-ended',
      },
    ],
  },
  {
    id: 2,
    title: 'survey.employeeSatisfaction.title',
    description: 'survey.employeeSatisfaction.description',
    questions: [
      {
        id: 1,
        questionText: 'survey.employeeSatisfaction.questions.1.questionText',
        type: 'rating',
      },
      {
        id: 2,
        questionText: 'survey.employeeSatisfaction.questions.2.questionText',
        type: 'rating',
      },
      {
        id: 3,
        questionText: 'survey.employeeSatisfaction.questions.3.questionText',
        type: 'multiple-choice',
        options: [
          'survey.employeeSatisfaction.questions.3.options.1',
          'survey.employeeSatisfaction.questions.3.options.2',
          'survey.employeeSatisfaction.questions.3.options.3',
        ],
      },
      {
        id: 4,
        questionText: 'survey.employeeSatisfaction.questions.4.questionText',
        type: 'open-ended',
      },
      {
        id: 5,
        questionText: 'survey.employeeSatisfaction.questions.5.questionText',
        type: 'multiple-choice',
        options: [
          'survey.employeeSatisfaction.questions.5.options.1',
          'survey.employeeSatisfaction.questions.5.options.2',
          'survey.employeeSatisfaction.questions.5.options.3',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'survey.productFeedback.title',
    description: 'survey.productFeedback.description',
    questions: [
      {
        id: 1,
        questionText: 'survey.productFeedback.questions.1.questionText',
        type: 'rating',
      },
      {
        id: 2,
        questionText: 'survey.productFeedback.questions.2.questionText',
        type: 'multiple-choice',
        options: [
          'survey.productFeedback.questions.2.options.1',
          'survey.productFeedback.questions.2.options.2',
          'survey.productFeedback.questions.2.options.3',
          'survey.productFeedback.questions.2.options.4',
        ],
      },
      {
        id: 3,
        questionText: 'survey.productFeedback.questions.3.questionText',
        type: 'open-ended',
      },
      {
        id: 4,
        questionText: 'survey.productFeedback.questions.4.questionText',
        type: 'rating',
      },
      {
        id: 5,
        questionText: 'survey.productFeedback.questions.5.questionText',
        type: 'multiple-choice',
        options: [
          'survey.productFeedback.questions.5.options.1',
          'survey.productFeedback.questions.5.options.2',
          'survey.productFeedback.questions.5.options.3',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'survey.websiteUsability.title',
    description: 'survey.websiteUsability.description',
    questions: [
      {
        id: 1,
        questionText: 'survey.websiteUsability.questions.1.questionText',
        type: 'rating',
      },
      {
        id: 2,
        questionText: 'survey.websiteUsability.questions.2.questionText',
        type: 'rating',
      },
      {
        id: 3,
        questionText: 'survey.websiteUsability.questions.3.questionText',
        type: 'multiple-choice',
        options: [
          'survey.websiteUsability.questions.3.options.1',
          'survey.websiteUsability.questions.3.options.2',
          'survey.websiteUsability.questions.3.options.3',
        ],
      },
      {
        id: 4,
        questionText: 'survey.websiteUsability.questions.4.questionText',
        type: 'open-ended',
      },
      {
        id: 5,
        questionText: 'survey.websiteUsability.questions.5.questionText',
        type: 'multiple-choice',
        options: [
          'survey.websiteUsability.questions.5.options.1',
          'survey.websiteUsability.questions.5.options.2',
          'survey.websiteUsability.questions.5.options.3',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'survey.eventFeedback.title',
    description: 'survey.eventFeedback.description',
    questions: [
      {
        id: 1,
        questionText: 'survey.eventFeedback.questions.1.questionText',
        type: 'rating',
      },
      {
        id: 2,
        questionText: 'survey.eventFeedback.questions.2.questionText',
        type: 'multiple-choice',
        options: [
          'survey.eventFeedback.questions.2.options.1',
          'survey.eventFeedback.questions.2.options.2',
          'survey.eventFeedback.questions.2.options.3',
        ],
      },
      {
        id: 3,
        questionText: 'survey.eventFeedback.questions.3.questionText',
        type: 'open-ended',
      },
      {
        id: 4,
        questionText: 'survey.eventFeedback.questions.4.questionText',
        type: 'open-ended',
      },
      {
        id: 5,
        questionText: 'survey.eventFeedback.questions.5.questionText',
        type: 'multiple-choice',
        options: [
          'survey.eventFeedback.questions.5.options.1',
          'survey.eventFeedback.questions.5.options.2',
          'survey.eventFeedback.questions.5.options.3',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'survey.mobileAppExperience.title',
    description: 'survey.mobileAppExperience.description',
    questions: [
      {
        id: 1,
        questionText: 'survey.mobileAppExperience.questions.1.questionText',
        type: 'rating',
      },
      {
        id: 2,
        questionText: 'survey.mobileAppExperience.questions.2.questionText',
        type: 'multiple-choice',
        options: [
          'survey.mobileAppExperience.questions.2.options.1',
          'survey.mobileAppExperience.questions.2.options.2',
          'survey.mobileAppExperience.questions.2.options.3',
        ],
      },
      {
        id: 3,
        questionText: 'survey.mobileAppExperience.questions.3.questionText',
        type: 'open-ended',
      },
      {
        id: 4,
        questionText: 'survey.mobileAppExperience.questions.4.questionText',
        type: 'rating',
      },
      {
        id: 5,
        questionText: 'survey.mobileAppExperience.questions.5.questionText',
        type: 'multiple-choice',
        options: [
          'survey.mobileAppExperience.questions.5.options.1',
          'survey.mobileAppExperience.questions.5.options.2',
          'survey.mobileAppExperience.questions.5.options.3',
          'survey.mobileAppExperience.questions.5.options.4',
        ],
      },
    ],
  },
];
