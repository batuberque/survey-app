import { Stack } from 'expo-router';
import React from 'react';

export default function SurveyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[surveyId]/[questionId]" />
      <Stack.Screen name="[surveyId]/result" />
    </Stack>
  );
}
