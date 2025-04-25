import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false, animation: 'fade' }}
      />
      <Stack.Screen
        name='onboarding'
        options={{
          headerShown: false,
          animation: 'fade',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name='new'
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          title: 'New Plant',
        }}
      />
    </Stack>
  );
}
