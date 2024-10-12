import React from 'react';
import { Text, YStack } from 'tamagui';

import useTimer from '~/hooks/useTimer';

const Timer: React.FC = () => {
  const remainingTime = useTimer();

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <YStack alignItems="center">
      <Text fontSize="$6">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds} dakika kaldı
      </Text>
    </YStack>
  );
};

export default Timer;
