import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TabsLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'survey':
              iconName = focused ? 'clipboard' : 'clipboard-outline';
              break;
            case 'result':
              iconName = focused ? 'bookmarks' : 'bookmarks-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tabs.Screen name="home" options={{ title: t('HOME') }} />
      <Tabs.Screen name="survey" options={{ title: t('SURVEY') }} />
      <Tabs.Screen name="profile" options={{ title: t('PROFILE') }} />
      <Tabs.Screen
        name="result"
        options={{
          title: t('RESULT'),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
