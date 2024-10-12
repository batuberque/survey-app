import { MaterialIcons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { YStack, XStack, Button, SizableText, Separator, Text } from 'tamagui';

import { CheckboxWithLabel } from '~/components/CheckboxWithLabel';
import FormInput from '~/components/FormInput';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { register, resetState } from '~/redux/slices/registerSlice';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  telephone: string;
}

const Register = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: 'John@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      telephone: '1-570-236-7033',
    },
    mode: 'onChange',
  });

  const { loading, error, success } = useAppSelector((state: any) => state.register);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [consent, setConsent] = useState<boolean>(false);
  const [consentError, setConsentError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormData> = useCallback(
    (data) => {
      if (!consent) {
        setConsentError(t('consentRequired'));
        return;
      }
      setConsentError(null);
      dispatch(register(data));
    },
    [consent, dispatch, t]
  );

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        router.push('/(auth)');
        dispatch(resetState());
        reset();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, router, reset]);

  useEffect(() => {
    if (error) {
      console.error('Kayıt hatası:', error);
      dispatch(resetState());
    }
  }, [error, dispatch]);

  const isInitialLoading = loading && !success;

  if (isInitialLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="$color12" />
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$6"
      space="$6"
      backgroundColor="$backgroundSoft"
      width="100%"
      height="100%">
      <YStack
        backgroundColor="$background"
        padding="$6"
        borderRadius="$8"
        elevation={4}
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={10}
        width="100%"
        maxWidth={400}>
        <Text fontWeight="700" fontSize="$8" color="$primary" marginBottom="$4" textAlign="center">
          {t('signup')}
        </Text>

        <YStack space="$4">
          <Controller
            control={control}
            name="email"
            rules={{
              required: t('emailRequired') as string,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                placeholder={t('emailPlaceholder')}
                value={value}
                onChangeText={onChange}
                error={!!error}
                helperText={error ? error.message : ''}
                leftIcon={<MaterialIcons name="email" size={20} color="$colorSubtle" />}
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            rules={{ required: t('usernameRequired') as string }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                placeholder={t('usernamePlaceholder')}
                value={value}
                onChangeText={onChange}
                error={!!error}
                helperText={error ? error.message : ''}
                leftIcon={<FontAwesome name="user" size={20} color="$colorSubtle" />}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: t('passwordRequired') as string,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                placeholder={t('passwordPlaceholder')}
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={!!error}
                helperText={error ? error.message : ''}
                leftIcon={<Ionicons name="lock-closed" size={20} color="$colorSubtle" />}
              />
            )}
          />

          <Controller
            control={control}
            name="telephone"
            rules={{
              required: t('telephoneRequired') as string,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                placeholder={t('telephonePlaceholder')}
                value={value}
                onChangeText={onChange}
                error={!!error}
                helperText={error ? error.message : ''}
                leftIcon={<Entypo name="phone" size={20} color="$colorSubtle" />}
              />
            )}
          />

          <YStack space="$2" marginTop="$2">
            <CheckboxWithLabel
              size="$4"
              label={t('kvkkConsentText')}
              checked={consent}
              onCheckedChange={(checked) => {
                setConsent(checked === true);
                if (checked === true) {
                  setConsentError(null);
                }
              }}
              accessibilityLabel={t('kvkkConsent')}
            />
            {consentError && (
              <SizableText color="$red10" fontSize="$3">
                {consentError}
              </SizableText>
            )}
          </YStack>
        </YStack>

        <Button
          size="$6"
          marginTop="$5"
          backgroundColor={isValid && consent ? '$gray6' : '$gray4'}
          borderRadius="$6"
          hoverStyle={{ backgroundColor: isValid && consent ? '$primaryHover' : '$gray4' }}
          pressStyle={{ scale: 0.95 }}
          width="100%"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !consent || loading}>
          {loading ? (
            <SizableText color="$white" fontWeight="bold">
              {t('loading')}
            </SizableText>
          ) : (
            <SizableText color="$white" fontWeight="bold">
              {t('signup')}
            </SizableText>
          )}
        </Button>

        {showSuccessMessage && (
          <YStack mt="$4" ai="center">
            <Entypo name="check" size={24} color="$green10" />
            <SizableText color="$green10" fontWeight="bold" textAlign="center" mt="$2">
              {t('registrationSuccess')}
            </SizableText>
          </YStack>
        )}
      </YStack>

      <Separator my="$-3" width="100%" maxWidth={400} />

      <XStack jc="center" space="$2">
        <SizableText color="$colorSubtle">{t('do_you_have_account')}</SizableText>
        <SizableText
          color="$blue10"
          fontWeight="bold"
          textDecorationLine="underline"
          cursor="pointer"
          onPress={() => {
            router.push('/(auth)');
          }}>
          {t('login')}
        </SizableText>
      </XStack>
    </YStack>
  );
};

export default Register;
