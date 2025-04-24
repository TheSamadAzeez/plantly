import { View, StyleSheet } from 'react-native';
import { theme } from '@/utils/theme';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { PlantlyButton } from '@/components/PlantlyButton';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace('/');
  };
  return (
    // LinearGradient is a component that allows you to create a gradient background
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      style={styles.container}
    >
      <PlantlyButton title='Let me in' onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 24,
  },
});
