import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { YStack, Input, Button, Text, Avatar, Separator, useTheme, ScrollView } from 'tamagui';

import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { fetchUser, updateUser, User } from '~/redux/slices/userSlice';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user, fetchStatus, updateStatus, updateError } = useAppSelector((state) => state.user);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<User>({
    defaultValues: user || {},
    mode: 'onChange',
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  useEffect(() => {
    if (updateStatus === 'succeeded') {
      setMessage(t('profileUpdateSuccess'));
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    } else if (updateStatus === 'failed' && updateError) {
      setMessage(t('profileUpdateFailed', { error: updateError }));
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    } else {
      setMessage(null);
    }
  }, [updateStatus, updateError, t]);

  const onSubmit: SubmitHandler<User> = useCallback(
    (data) => {
      dispatch(updateUser(data));
    },
    [dispatch]
  );

  const avatarInitials = useMemo(() => {
    if (user?.name.firstname && user?.name.lastname) {
      return `${user.name.firstname.charAt(0)}${user.name.lastname.charAt(0)}`;
    }
    return '';
  }, [user]);

  const isInitialLoading = useMemo(() => fetchStatus === 'loading' && !user, [fetchStatus, user]);

  if (isInitialLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="$gray6" />
      </YStack>
    );
  }

  return (
    <ScrollView flex={1} backgroundColor={theme.background}>
      <YStack padding="$4" space="$4">
        <YStack alignItems="center" space="$2">
          <Avatar size="$10">
            <Avatar.Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              width="100%"
              height="100%"
            />
            <Avatar.Fallback backgroundColor="$gray5">
              <Text fontSize="$6" color="$gray1" justifyContent="center">
                {avatarInitials}
              </Text>
            </Avatar.Fallback>
          </Avatar>
          <Text fontSize="$7" fontWeight="700" justifyContent="center">
            {user?.name.firstname} {user?.name.lastname}
          </Text>
          <Text fontSize="$6" color="$color9" justifyContent="center">
            {user?.email}
          </Text>
        </YStack>

        <Separator marginVertical="$4" />

        {message && (
          <YStack marginBottom="$2" alignItems="center">
            <Text color={updateStatus === 'failed' ? '$red10' : '$green10'} justifyContent="center">
              {message}
            </Text>
          </YStack>
        )}

        <YStack space="$4">
          <Text fontSize="$7" fontWeight="600" justifyContent="center" textAlign="center">
            {t('personalInfo')}
          </Text>

          <YStack space="$3">
            <Text fontSize="$6" justifyContent="center" textAlign="center">
              {t('firstName')}
            </Text>
            <Controller
              control={control}
              name="name.firstname"
              rules={{
                required: t('firstNameRequired'),
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder={t('firstNamePlaceholder')}
                    borderWidth={1}
                    borderColor={errors.name?.firstname ? '$red10' : '$gray5'}
                    borderRadius="$4"
                    padding="$3"
                  />
                  {errors.name?.firstname && (
                    <Text color="$red10" fontSize="$4">
                      {errors.name.firstname.message}
                    </Text>
                  )}
                </>
              )}
            />
          </YStack>

          <YStack space="$3">
            <Text fontSize="$6" justifyContent="center" textAlign="center">
              {t('lastName')}
            </Text>
            <Controller
              control={control}
              name="name.lastname"
              rules={{
                required: t('lastNameRequired'),
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder={t('lastNamePlaceholder')}
                    borderWidth={1}
                    borderColor={errors.name?.lastname ? '$red10' : '$gray5'}
                    borderRadius="$4"
                    padding="$3"
                  />
                  {errors.name?.lastname && (
                    <Text color="$red10" fontSize="$4">
                      {errors.name.lastname.message}
                    </Text>
                  )}
                </>
              )}
            />
          </YStack>

          <YStack space="$3">
            <Text fontSize="$6" justifyContent="center" textAlign="center">
              {t('email')}
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: t('emailRequired'),
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t('invalidEmail'),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder={t('emailPlaceholder')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    borderWidth={1}
                    borderColor={errors.email ? '$red10' : '$gray5'}
                    borderRadius="$4"
                    padding="$3"
                  />
                  {errors.email && (
                    <Text color="$red10" fontSize="$4">
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />
          </YStack>

          <Button
            size="$6"
            backgroundColor={isValid ? '$gray6' : '$gray4'}
            marginTop="$4"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            accessibilityLabel={t('profileUpdateButton')}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color="$white" />
            ) : (
              <Text color="$white" fontSize="$6" fontWeight="600" justifyContent="center">
                {t('update')}
              </Text>
            )}
          </Button>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default Profile;
