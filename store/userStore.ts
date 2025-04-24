import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
};

/**
 * Creates and exports a Zustand store to manage the user's onboarding status
 * The store provides a boolean state and a function to toggle that state
 * persists the state to AsyncStorage using the `persist` middleware and the `createJSONStorage` function to create a storage instance
 * @returns {UserStore} A Zustand store instance with onboarding state management
 */
export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () => {
        return set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
          };
        });
      },
    }),
    {
      name: 'plantly-user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
