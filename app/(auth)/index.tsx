import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { YStack, Text, useTheme } from 'tamagui';

import FormInput from '~/components/FormInput';
import LanguageSwitch from '~/components/LanguageSwitch';
import SubmitButton from '~/components/SubmitButton';
import ThemeSwitch from '~/components/ThemeSwitch';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { login } from '~/redux/slices/authSlice';

type FormData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const themeContext = useTheme();
  const theme = themeContext?.name;

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      username: 'mor_2314',
      password: '83r5^_',
    },
  });

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = useCallback(
    async (data: FormData) => {
      try {
        await dispatch(login(data)).unwrap();
        router.push('/home');
      } catch (error: any) {
        console.error(error);
      }
    },
    [dispatch, router]
  );

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      backgroundColor={theme === 'dark' ? '$black' : '$gray1'}>
      <YStack
        padding="$6"
        width="90%"
        maxWidth={400}
        backgroundColor={theme === 'dark' ? '$gray8' : '$gray1'}
        borderRadius="$10"
        elevation={5}
        shadowColor={theme === 'dark' ? '$gray2' : '#888'}
        justifyContent="center"
        alignItems="center"
        space>
        <Text fontWeight="bold" fontSize="$8" color="$primary" marginBottom="$4">
          {t('welcome')}
        </Text>

        <YStack width="100%" marginVertical="$4" space="$4">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <FormInput placeholder="Username" value={value} onChangeText={onChange} />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <FormInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
        </YStack>

        <SubmitButton onPress={handleSubmit(handleLogin)} loading={loading} label={t('login')} />

        {error && (
          <Text color="$red10" marginVertical="$2" textAlign="center">
            {error}
          </Text>
        )}

        <YStack marginVertical="$6" space="$4" width="100%">
          <LanguageSwitch />
          <ThemeSwitch />
        </YStack>

        <Text
          onPress={() => router.push('/register')}
          fontSize="$4"
          color="$blue10"
          marginTop="$4"
          textAlign="center"
          style={{ textDecorationLine: 'underline' }}>
          {t('not_remember_create_account')}
        </Text>
      </YStack>
    </YStack>
  );
};

export default Login;
