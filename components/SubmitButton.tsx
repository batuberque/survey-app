// ~/components/SubmitButton.tsx
import React from 'react';
import { Button, Text } from 'tamagui';

interface SubmitButtonProps {
  onPress: () => void;
  loading: boolean;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, loading, label }) => (
  <Button
    width="100%"
    borderRadius="$8"
    onPress={onPress}
    backgroundColor="$gray6"
    hoverStyle={{ opacity: 0.9 }}
    pressStyle={{ scale: 0.95 }}>
    <Text fontWeight="bold" fontSize="$6" color="$white">
      {loading ? 'Loading...' : label}
    </Text>
  </Button>
);

export default SubmitButton;
