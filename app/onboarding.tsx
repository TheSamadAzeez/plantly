import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { theme } from '@/utils/theme';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { PlantlyButton } from '@/components/PlantlyButton';
import { LinearGradient } from 'expo-linear-gradient';
import { PlantlyImage } from '@/components/PlantlyImage';

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
      <StatusBar barStyle='light-content' />
      <View>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagline}>
          Keep your plants healthy and hydrated
        </Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title='Let me in' onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
    paddingHorizontal: 18,
  },
  heading: {
    fontSize: 42,
    color: theme.colorWhite,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 24,
    color: theme.colorWhite,
    textAlign: 'center',
  },
});
