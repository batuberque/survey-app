import React, { ReactNode } from 'react';
import { Input, YStack, useTheme } from 'tamagui';

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  error = false,
  helperText,
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.name;

  return (
    <YStack space="$2" width="100%">
      <YStack
        borderWidth={1}
        borderColor={error ? '$red10' : theme === 'dark' ? '$gray6' : '$gray5'}
        borderRadius="$8"
        paddingHorizontal="$3"
        paddingVertical="$2"
        backgroundColor={theme === 'dark' ? '$gray9' : '$gray2'}
        flexDirection="row"
        alignItems="center">
        {leftIcon && <YStack marginRight="$2">{leftIcon}</YStack>}
        <Input
          flex={1}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType="default"
          autoCapitalize="none"
          color={error ? '$red10' : theme === 'dark' ? '$gray1' : '$black'}
          fontSize="$4"
          borderWidth={0}
          backgroundColor="transparent"
        />
        {rightIcon && <YStack marginLeft="$2">{rightIcon}</YStack>}
      </YStack>
      {helperText && (
        <YStack>
          <Input
            readOnly
            value={helperText}
            color={error ? '$red10' : '$colorSubtle'}
            fontSize="$3"
          />
        </YStack>
      )}
    </YStack>
  );
};

export default FormInput;
